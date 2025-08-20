package com.nextrole.profileservice.dto;

import java.util.Base64;
import java.util.List;

import com.nextrole.profileservice.model.Profile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {
  private String id;
  private String userId;
  private String name;
  private String email;
  private String jobTitle;
  private String company;
  private String location;
  private String about;
  private String profilePicture;
  private String coverPicture;
  private String resume;
  private Long totalExp;

  private List<String> savedJobs;

  private List<String> skills;
  private List<Experience> experiences;
  private List<Certification> certifications;

  public Profile toEntity() {
    return new Profile(this.id, this.userId, this.name, this.email, this.jobTitle, this.company, this.location, this.about,
        this.profilePicture != null ? Base64.getDecoder().decode(this.profilePicture) : null, 
        this.coverPicture != null ? Base64.getDecoder().decode(this.coverPicture) : null, 
        this.resume != null ? Base64.getDecoder().decode(this.resume) : null, 
        this.totalExp, 
        this.savedJobs, this.skills,
        this.experiences, this.certifications);
  }
  
}
