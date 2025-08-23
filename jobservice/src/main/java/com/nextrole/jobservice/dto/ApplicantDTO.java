package com.nextrole.jobservice.dto;

import java.time.LocalDateTime;
import java.util.Base64;

import com.nextrole.common_dto.dto.ApplicationStatus;
import com.nextrole.jobservice.model.Applicant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicantDTO {
  private Long applicantId;
  private String name;
  private String email;
  private Long phone;
  private String website;
  private String resume;
  private String coverLetter;
  private LocalDateTime timeStamp;
  private ApplicationStatus applicationStatus;
  private LocalDateTime interviewTime;

  public Applicant toEntity() {
    return new Applicant(this.applicantId, this.name, this.email, this.phone, this.website,
        this.resume != null ? Base64.getDecoder().decode(this.resume) : null, this.coverLetter, this.timeStamp,
        this.applicationStatus, this.interviewTime);
  }

}
