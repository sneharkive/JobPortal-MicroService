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
import com.nextrole.jobservice.dto.JobDTO;
import com.nextrole.jobservice.model.Applicant;
import com.nextrole.jobservice.model.Job;
import com.nextrole.jobservice.repository.JobRepository;
import com.nextrole.jobservice.utils.Utilities;
import com.nextrole.jobservice.dto.ApplicantDTO;



@Service
public class JobService {

  @Autowired
  private JobRepository jobRepository;

  // @Autowired
  // private NotificationService notificationService;

  public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
    if (jobDTO.getId() == null) {

      jobDTO.setId(Utilities.getNextSequence("jobs"));
      jobDTO.setPostTime(LocalDateTime.now());

      // NotificationDTO notiDTO = new NotificationDTO();
      // notiDTO.setAction("Job Posted");
      // notiDTO.setMessage("Job Posted Successfully for " + jobDTO.getJobTitle() + jobDTO.getCompany());
      // notiDTO.setUserId(jobDTO.getPostedBy());
      // notiDTO.setRoute("/posted-jobs/" + jobDTO.getId());
      // notificationService.sendNotification(notiDTO);
    }

    else {
      Job job = jobRepository.findById(jobDTO.getId()).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
      if (job.getJobStatus().equals(JobStatus.DRAFT) || jobDTO.getJobStatus().equals(JobStatus.CLOSED))
        jobDTO.setPostTime(LocalDateTime.now());
    }

    return jobRepository.save(jobDTO.toEntity()).toDTO();
  }

  public List<JobDTO> getAllJobs() throws JobPortalException {
    return jobRepository.findAll().stream().map((x) -> x.toDTO()).toList();
  }

  public JobDTO getJob(Long id) throws JobPortalException {
    return jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND")).toDTO();
  }

  public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
    Job job = jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
    List<Applicant> applicants = job.getApplicants();
    if (applicants == null)
      applicants = new ArrayList<>();
    if (applicants.stream().filter((x) -> x.getApplicantId() == applicantDTO.getApplicantId()).toList().size() > 0)
      throw new JobPortalException("JOB_APPLIED_ALREADY");

    applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);

    applicants.add(applicantDTO.toEntity());
    job.setApplicants(applicants);
    jobRepository.save(job);
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
          // NotificationDTO notiDTO = new NotificationDTO();
          // notiDTO.setAction("Interview Schedule");
          // notiDTO.setMessage("Interview for job id : " + application.getId());
          // notiDTO.setUserId(application.getApplicantId());
          // // notiDTO.setRoute("/jobs/"+application.getId());
          // notiDTO.setRoute("/job-history");
          // try {
          //   notificationService.sendNotification(notiDTO);
          // } catch (JobPortalException e) {
          //   e.printStackTrace();
          // }
        }
      }
      return x;
    }).toList();

    job.setApplicants(applicants);
    jobRepository.save(job);

  }

}
