package com.nextrole.userservice.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.dto.LoginDTO;
import com.nextrole.common_dto.dto.ResponseDTO;
import com.nextrole.common_dto.exception.JobPortalException;
import com.nextrole.common_dto.kafka.UserChangePassEvent;
import com.nextrole.common_dto.kafka.UserCreatedEvent;
import com.nextrole.common_dto.kafka.UserDeletedEvent;
import com.nextrole.common_dto.kafka.UserLogInEvent;
import com.nextrole.userservice.client.ProfileClient;
import com.nextrole.userservice.dto.UserDTO;
import com.nextrole.userservice.entity.User;
import com.nextrole.userservice.kafka.UserEventProducer;
import com.nextrole.userservice.repository.UserRepo;


import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private UserEventProducer userEventProducer;

  @Autowired
  private ProfileClient profileClient;

  public UserDTO registerUser(UserDTO userDTO) throws JobPortalException {
    Optional<User> opt = userRepo.findByEmail(userDTO.getEmail());
    if (opt.isPresent())
      throw new JobPortalException("User Already Exist!!");

    userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
    User user = userDTO.toEntity();
    user = userRepo.save(user);

    // if (userDTO.getAccountType() == AccountType.APPLICANT) {
      UserCreatedEvent event = new UserCreatedEvent();
      event.setUserId(user.getId().toString());
      event.setEmail(user.getEmail());
      event.setName(user.getName());
      event.setAccountType(user.getAccountType());
      event.setTimestamp( LocalDateTime.now());

      userEventProducer.sendUserCreatedEvent(event);
    // }

    return user.toDTO();
  }

  public UserDTO getUserById(Long id) throws JobPortalException {
    return userRepo.findById(id).orElseThrow(() -> new JobPortalException("User Not Found!!")).toDTO();
  }

  public UserDTO getUserByEmail(String email) throws JobPortalException {
    return userRepo.findByEmail(email).orElseThrow(() -> new JobPortalException("User Not Found!!")).toDTO();
  }
  

  public String deleteUser(Long id) throws JobPortalException {
    User user = userRepo.findById(id)
        .orElseThrow(() -> new JobPortalException("User not found with id: " + id));

    String profileId = user.getProfileId();
    
    // Call profile-service to delete profile (via Feign)
    if (profileId != null) {
        try {
            profileClient.deleteProfile(profileId);
            log.info("Deleted profile {} for user {}", profileId, id);
        } catch (Exception e) {
            log.error("Failed to delete profile {} for user {}. Rolling back user deletion.", profileId, id, e);
            throw new JobPortalException("Could not delete profile for user " + id);
        }
    }
    
    userRepo.delete(user);
      userEventProducer.sendUserDeletedEvent(
            new UserDeletedEvent(user.getId().toString(), user.getName(), user.getEmail(), LocalDateTime.now())
        );
    return "User (and profile if existed) deleted successfully with id: " + id;
  }




  public ResponseDTO changePassword(LoginDTO loginDTO) throws JobPortalException {
    User user = userRepo.findByEmail(loginDTO.getEmail()).orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
    user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
    userRepo.save(user);


      userEventProducer.sendUserChangePassEvent(
            new UserChangePassEvent(user.getId().toString(), user.getName(), user.getEmail(),  LocalDateTime.now())
        );

    return new ResponseDTO("Password changed successfully.");
  }


  public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException{
    UserDTO user = getUserByEmail(loginDTO.getEmail());
    if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) throw new JobPortalException(("INVALID_CREDENTIALS"));

          userEventProducer.sendUserLogInEvent(
            new UserLogInEvent(user.getId().toString(), user.getName(), user.getEmail(),  LocalDateTime.now())
        );

    return user;
  }



   public static String generateOtp() {
    StringBuilder otp = new StringBuilder();
    SecureRandom random = new SecureRandom();
    // Generate a 6-digit OTP 
    for (int i = 0; i < 6; i++) 
      otp.append(random.nextInt(10));
    
    return otp.toString();
  }


  

}
