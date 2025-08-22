package com.nextrole.userservice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.dto.AccountType;
import com.nextrole.common_dto.dto.LoginDTO;
import com.nextrole.common_dto.dto.UserCreatedEvent;
import com.nextrole.common_dto.exception.JobPortalException;
import com.nextrole.userservice.dto.UserDTO;
import com.nextrole.userservice.entity.User;
import com.nextrole.userservice.repository.UserRepo;

@Service
public class UserService {

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private UserEventProducer userEventProducer;


  public UserDTO registerUser(UserDTO userDTO) throws JobPortalException {
    Optional<User> opt = userRepo.findByEmail(userDTO.getEmail());
    if (opt.isPresent())
      throw new JobPortalException("User Already Exist!!");

    userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
    User user = userDTO.toEntity();
    user = userRepo.save(user);
    
    if (userDTO.getAccountType() == AccountType.APPLICANT) {
      UserCreatedEvent event = new UserCreatedEvent();
      event.setUserId(user.getId().toString());
      event.setEmail(user.getEmail());
      event.setName(user.getName());
      event.setAccountType(user.getAccountType());

      userEventProducer.sendUserCreatedEvent(event);
    }
    

    return user.toDTO();
  }

  public UserDTO getUserById(Long id) throws JobPortalException {
    return userRepo.findById(id).orElseThrow(() -> new JobPortalException("User Not Found!!")).toDTO();
  }


  public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException{
    User user = userRepo.findByEmail(loginDTO.getEmail()).orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
    if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) throw new JobPortalException(("INVALID_CREDENTIALS"));
    return user.toDTO();
  }

}
