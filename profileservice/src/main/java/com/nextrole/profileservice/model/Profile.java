package com.nextrole.profileservice.model;

import java.util.Base64;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.nextrole.profileservice.dto.Certification;
import com.nextrole.profileservice.dto.Experience;
import com.nextrole.profileservice.dto.ProfileDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "profiles")
public class Profile {
  @Id
  private String id;
  private String name;
  private String email;
  private String jobTitle;
  private String company;
  private String location;
  private String about;
  // private byte[] picture;
  private Long totalExp;

  private List<String>savedJobs;

  private List<String> skills;
  private List<Experience> experiences;
  private List<Certification> certifications;

  public ProfileDTO toDTO() {
    return new ProfileDTO(this.id, this.name, this.email, this.jobTitle, this.company, this.location, this.about,
      // this.picture != null ? Base64.getEncoder().encodeToString(this.picture) : null, 
      this.totalExp, this.savedJobs, this.skills,
      this.experiences, this.certifications);
  }

}

