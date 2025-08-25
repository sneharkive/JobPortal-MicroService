package com.nextrole.jobservice.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.dto.Application;
import com.nextrole.common_dto.dto.ApplicationStatus;
import com.nextrole.common_dto.dto.JobStatus;
import com.nextrole.common_dto.exception.JobPortalException;
import com.nextrole.common_dto.kafka.JobApplicationStatusChangedEvent;
import com.nextrole.common_dto.kafka.JobAppliedEvent;
import com.nextrole.common_dto.kafka.JobPostedEvent;
import com.nextrole.jobservice.dto.JobDTO;
import com.nextrole.jobservice.kafka.JobEventProducer;
import com.nextrole.jobservice.model.Applicant;
import com.nextrole.jobservice.model.Job;
import com.nextrole.jobservice.repository.JobRepository;
import com.nextrole.jobservice.utils.Utilities;
import com.nextrole.jobservice.dto.ApplicantDTO;

@Service
public class JobService {

  @Autowired
  private JobRepository jobRepository;

  @Autowired
  private JobEventProducer jobEventProducer;

  public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
    if (jobDTO.getId() == null) {
      jobDTO.setId(Utilities.getNextSequence("jobs"));
      jobDTO.setPostTime(LocalDateTime.now());
    }

    else {
      // Job job = jobRepository.findById(jobDTO.getId()).orElseThrow(() -> new
      // JobPortalException("JOB_NOT_FOUND"));
      // if (job.getJobStatus().equals(JobStatus.DRAFT) ||
      // jobDTO.getJobStatus().equals(JobStatus.CLOSED))
      // jobDTO.setPostTime(LocalDateTime.now());

      jobRepository.findById(jobDTO.getId()).ifPresentOrElse(job -> {
        if (job.getJobStatus().equals(JobStatus.DRAFT) || jobDTO.getJobStatus().equals(JobStatus.CLOSED)) {
          jobDTO.setPostTime(LocalDateTime.now());
        }
      }, () -> {
        // if job with given ID doesn’t exist → just treat it as new job
        jobDTO.setPostTime(LocalDateTime.now());
      });
    }

    Job savedJob = jobRepository.save(jobDTO.toEntity());

    jobEventProducer.sendJobPostedEvent(
        new JobPostedEvent(
            savedJob.getId().toString(),
            savedJob.getJobTitle(),
            savedJob.getCompany(),
            savedJob.getPostedBy().toString(),
            savedJob.getJobStatus(),
            LocalDateTime.now()));

    return savedJob.toDTO();
  }

  public List<JobDTO> getAllJobs() throws JobPortalException {
    return jobRepository.findAll().stream().map((x) -> x.toDTO()).toList();
  }

  public JobDTO getJob(Long id) throws JobPortalException {
    return jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND")).toDTO();
  }

  public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
    Job job = jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
    // List<Applicant> applicants = job.getApplicants();
    List<Applicant> applicants = job.getApplicants() == null ? new ArrayList<>() : job.getApplicants();

    if (applicants.stream().anyMatch(x -> x.getApplicantId() == applicantDTO.getApplicantId()))
      throw new JobPortalException("JOB_APPLIED_ALREADY");

    applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
    applicants.add(applicantDTO.toEntity());
    job.setApplicants(applicants);
    jobRepository.save(job);

    jobEventProducer.sendJobAppliedEvent(
        new JobAppliedEvent(
            job.getId().toString(),
            applicantDTO.getApplicantId().toString(),
            applicantDTO.getName(),
            applicantDTO.getEmail(),
            LocalDateTime.now()));
  }

  public List<JobDTO> getJobsPostedBy(Long id) throws JobPortalException {
    return jobRepository.findByPostedBy(id).stream().map((x) -> x.toDTO()).toList();
  }

  public void changeAppStatus(Application application) throws JobPortalException {
    Job job = jobRepository.findById(application.getId()).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
    List<Applicant> applicants = job.getApplicants().stream().map((x) -> {
      if (application.getApplicantId() == x.getApplicantId()) {
        x.setApplicationStatus(application.getApplicationStatus());
        if (application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)) {
          x.setInterviewTime(application.getInterviewTime());
        }
      }
      return x;
    }).toList();

    job.setApplicants(applicants);
    jobRepository.save(job);

    jobEventProducer.sendJobAppStatusChangedEvent(
        new JobApplicationStatusChangedEvent(
            application.getId().toString(),
            application.getApplicantId().toString(),
            application.getApplicationStatus(),
            LocalDateTime.now()));

  }

}
