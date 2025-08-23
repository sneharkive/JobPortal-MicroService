package com.nextrole.authservice.jwt;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nextrole.authservice.dto.UserDTO;
import com.nextrole.authservice.service.AuthService;


@Service
public class MyUserDetailsService implements UserDetailsService {

  @Autowired
  private AuthService authService;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    try {
      UserDTO dto = authService.getUserByEmail(email);
      return new CustomUserDetails(dto.getId(), email, dto.getName(), dto.getProfileId(), dto.getPassword(), dto.getAccountType(), new ArrayList<>());
    } catch (UsernameNotFoundException e) {
      e.printStackTrace();
    }
    return null;
  }

}
