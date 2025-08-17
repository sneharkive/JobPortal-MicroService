package com.nextrole.userservice.dto;

import com.nextrole.userservice.entity.User;

import jakarta.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
  private Long id;

  @Column(nullable = false)
  private String name;

 @Column(unique = true, nullable = false)
  private String email;

  @Column(unique = true, nullable = false)
  private String password;

  private AccountType accountType;
  private Long profileId;


  public User toEntity(){
    return new User(this.id, this.name, this.email, this.password, this.accountType, this.profileId);
  }
}

