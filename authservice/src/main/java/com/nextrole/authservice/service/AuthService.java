package com.nextrole.authservice.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nextrole.authservice.client.UserClient;
import com.nextrole.authservice.dto.UserDTO;
import com.nextrole.authservice.model.OTP;
import com.nextrole.authservice.repository.OTPRepository;
import com.nextrole.authservice.utility.Data;
import com.nextrole.common_dto.dto.LoginDTO;
import com.nextrole.common_dto.exception.JobPortalException;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;


@Service
public class AuthService {
  
  @Autowired 
  private UserClient userClient;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private OTPRepository otpRepository;

  @Autowired
  private JavaMailSender mailSender;

  public UserDTO getUserByEmail(String emil) {
   UserDTO user = userClient.getUserByEmail(emil);
   return user;
  }

  public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException{
    UserDTO user = getUserByEmail(loginDTO.getEmail());
    if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) throw new JobPortalException(("INVALID_CREDENTIALS"));
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


  public Boolean sendOtp(String email) throws Exception {
    // User user = userRepository.findByEmail(email).orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
    UserDTO user = getUserByEmail(email);
    MimeMessage mm = mailSender.createMimeMessage();
    MimeMessageHelper message = new MimeMessageHelper(mm, true);
    message.setTo(email);
    message.setSubject("Your OTP for NextRole");
    String genOTP = generateOtp();

    OTP otp = new OTP(email, genOTP, LocalDateTime.now());

    otpRepository.save(otp);
    message.setText(Data.getMessageBody(genOTP, user.getName()), true);
    mailSender.send(mm);
    return true;
  }



  public void verifyOtp(String email, String otp) throws JobPortalException {
    OTP otpEntity = otpRepository.findById(email)
        .orElseThrow(() -> new JobPortalException("OTP_NOT_FOUND"));

    if (!otpEntity.getOtpCode().equals(otp)) throw new JobPortalException("OTP_INCORRECT");
    
    // otpRepository.delete(otpEntity);
    return;
  }


  @Scheduled(fixedRate = 600000) // Runs every 10 minutes
  public void removeExpiredOtps() {
    LocalDateTime expiry = LocalDateTime.now().minusMinutes(10);
    List<OTP> expiredOtps = otpRepository.findByCreationTimeBefore(expiry);
    if (!expiredOtps.isEmpty()) 
      otpRepository.deleteAll(expiredOtps);
     
  }


}