package com.nextrole.authservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nextrole.authservice.jwt.AuthenticationRequest;
import com.nextrole.authservice.jwt.AuthenticationResponse;
import com.nextrole.authservice.jwt.JwtHelper;
import com.nextrole.authservice.service.AuthService;
import com.nextrole.common_dto.dto.ResponseDTO;
import com.nextrole.common_dto.exception.JobPortalException;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
// @CrossOrigin
@RequestMapping("/auth")
public class AuthAPI {

  @Autowired
  private AuthService authService;

  @Autowired
  private UserDetailsService userDetailsService;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtHelper jwtHelper;


  @PostMapping("/login")
  public ResponseEntity<?> createAuthToken(@RequestBody AuthenticationRequest req) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
    final UserDetails userDetails = userDetailsService.loadUserByUsername(req.getEmail());
    final String jwt = jwtHelper.generateToken(userDetails);
    return ResponseEntity.ok(new AuthenticationResponse(jwt));
  }

  @PostMapping("/sendOtp/{email}")
  public ResponseEntity<ResponseDTO> sendOtp(@PathVariable @Email(message = "{user.email.invalid}") String email)
      throws Exception {
    Boolean check = authService.sendOtp(email);
    return new ResponseEntity<>(new ResponseDTO(check ? "OTP sent successfully" : "Something Went Wrong!!!"),
        HttpStatus.OK);
  }

  @GetMapping("/verifyOtp/{email}/{otp}")
  public ResponseEntity<ResponseDTO> verifyOtp(@PathVariable @Email(message = "{user.email.invalid}") String email,
      @PathVariable @Pattern(regexp = "^[0-9]{6}$", message = "{otp.invalid}") String otp) throws JobPortalException {

    authService.verifyOtp(email, otp);
    return new ResponseEntity<>(new ResponseDTO("OTP has been verified successfully."), HttpStatus.OK);
  }

}