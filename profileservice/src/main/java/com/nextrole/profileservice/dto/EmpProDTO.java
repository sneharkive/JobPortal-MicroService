package com.nextrole.profileservice.dto;

import org.springframework.data.annotation.Id;

import java.util.Base64;
import com.nextrole.profileservice.model.EmpProfile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpProDTO {
  @Id
  private String id;
  private String userId;
  private String name;
  private String email;
  private String company;
  private String location;
  private String about;
  private String profilePicture;
  private String coverPicture;


  
  public EmpProfile toEntity() {
    return new EmpProfile(this.id, this.userId, this.name, this.email, this.company, this.location, this.about,
                this.profilePicture != null ? Base64.getDecoder().decode(this.profilePicture) : null, 
        this.coverPicture != null ? Base64.getDecoder().decode(this.coverPicture) : null
        );
  }
}
