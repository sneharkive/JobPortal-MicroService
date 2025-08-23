package com.nextrole.authservice.jwt;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.nextrole.common_dto.dto.AccountType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomUserDetails implements UserDetails {

  private Long id;
  private String username;
  private String name;
  private String profileId;
  private String password;
  private AccountType accountType;
  private Collection<?extends GrantedAuthority> authorities;

}
