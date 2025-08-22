package com.nextrole.authservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nextrole.authservice.client.UserClient;
import com.nextrole.authservice.dto.UserDTO;

@Service
public class AuthService {
  @Autowired 
  private UserClient userClient;

  public UserDTO getUserById(Long id) {
   UserDTO user = userClient.getUserById(id);
   return user;
  }

}