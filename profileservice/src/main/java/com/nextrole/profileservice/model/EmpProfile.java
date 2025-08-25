package com.nextrole.profileservice.model;

import java.util.Base64;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.nextrole.profileservice.dto.EmpProDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "empsprofiles")
public class EmpProfile {
  @Id
  private String id;
  private String userId;
  private String name;
  private String email;
  private String company;
  private String location;
  private String about;
  private byte[] profilePicture;
  private byte[] coverPicture;

  public EmpProDTO toDTO() {
    return new EmpProDTO(this.id, this.userId, this.name, this.email, this.company, this.location,
        this.about,
        this.profilePicture != null ? Base64.getEncoder().encodeToString(this.profilePicture) : null,
        this.coverPicture != null ? Base64.getEncoder().encodeToString(this.coverPicture) : null);
  }
}
