package com.nextrole.userservice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nextrole.userservice.dto.AccountType;
import com.nextrole.userservice.dto.UserDTO;
import com.nextrole.userservice.entity.User;
import com.nextrole.userservice.exception.JobPortalException;
import com.nextrole.userservice.repository.UserRepo;

@Service
public class UserService {

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public UserDTO registerUser(UserDTO userDTO) throws JobPortalException {
    Optional<User> opt = userRepo.findByEmail(userDTO.getEmail());
    if(opt.isPresent()) throw new JobPortalException("User Already Exist!!");


    // if (userDTO.getAccountType() == AccountType.APPLICANT) {
    //   ProfileDTO profile = profileClient.createProfile(new ProfileDTO(userDTO.getName(), userDTO.getEmail()));
    //   userDTO.setProfileId(profile.getId());
    // }

    userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
    User user = userDTO.toEntity();
    user = userRepo.save(user);

    return user.toDTO();
  }


  public UserDTO getUserById(Long id) throws JobPortalException {
    return userRepo.findById(id).orElseThrow(() -> new JobPortalException("User Not Found!!")).toDTO();
  }
  
}
