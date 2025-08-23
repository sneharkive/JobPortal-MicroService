package com.nextrole.jobservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nextrole.common_dto.dto.Application;
import com.nextrole.common_dto.dto.ResponseDTO;
import com.nextrole.common_dto.exception.JobPortalException;
import com.nextrole.jobservice.dto.ApplicantDTO;
import com.nextrole.jobservice.dto.JobDTO;
import com.nextrole.jobservice.service.JobService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
@Validated
@RequestMapping("/jobs")
public class JobController {

  @Autowired
  private JobService jobService;

  @PostMapping("/postJob")
  public ResponseEntity<JobDTO> postJob(@RequestBody @Valid JobDTO jobDTO) throws JobPortalException  {
    jobDTO = jobService.postJob(jobDTO);
    return new ResponseEntity<>(jobDTO, HttpStatus.CREATED);
  }

  @GetMapping("/getAllJobs")
  public ResponseEntity<List<JobDTO>> getAllJobs() throws JobPortalException  {
    return new ResponseEntity<>(jobService.getAllJobs(), HttpStatus.OK);
  }

  @GetMapping("/getJob/{id}")
  public ResponseEntity<JobDTO> getJob( @PathVariable Long id) throws JobPortalException  {
    return new ResponseEntity<>(jobService.getJob(id), HttpStatus.OK);
  }

  @PostMapping("/applyJob/{id}")
  public ResponseEntity<ResponseDTO> applyJob( @PathVariable Long id, @RequestBody @Valid ApplicantDTO applicantDTO) throws JobPortalException  {
    jobService.applyJob(id, applicantDTO);
    return new ResponseEntity<>(new ResponseDTO ("Applied Successfully") , HttpStatus.OK);
  }
  
  
  @GetMapping("/postedBy/{id}")
  public ResponseEntity<List<JobDTO>> getJobsPostedBy( @PathVariable Long id) throws JobPortalException  {
    return new ResponseEntity<>(jobService.getJobsPostedBy(id), HttpStatus.OK);
  }


  @PostMapping("/changeAppStatus")
  public ResponseEntity<ResponseDTO> changeAppStatus(@RequestBody Application application) throws JobPortalException  {
    jobService.changeAppStatus(application);
    return new ResponseEntity<>(new ResponseDTO ("Application Status Changed Successfully") , HttpStatus.OK);
  }


}


