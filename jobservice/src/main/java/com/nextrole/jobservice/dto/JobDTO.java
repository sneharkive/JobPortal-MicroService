package com.nextrole.jobservice.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.nextrole.common_dto.dto.JobStatus;
import com.nextrole.jobservice.model.Job;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobDTO {
  private Long id;
  private String jobTitle;
  private String company;
  private List<ApplicantDTO> applicants;
  private String about;
  private String experience;
  private String location;
  private String jobType;
  private Long packageOffered;
  private LocalDateTime postTime;
  private String description;
  private List<String> skillsRequired;
  private JobStatus jobStatus;
  private Long postedBy;

  public Job toEntity() {
    return new Job(
        this.id,
        this.jobTitle,
        this.company,
        this.applicants != null ? this.applicants.stream().map(x -> x.toEntity()).toList() : null,
        this.about,
        this.experience,
        this.location,
        this.jobType,
        this.packageOffered,
        this.postTime,
        this.description,
        this.skillsRequired,
        this.jobStatus, this.postedBy);
  }
}
