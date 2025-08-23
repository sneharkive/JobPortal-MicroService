package com.nextrole.authservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nextrole.authservice.dto.UserDTO;

import com.nextrole.authservice.service.AuthService;
import com.nextrole.common_dto.dto.LoginDTO;
import com.nextrole.common_dto.dto.ResponseDTO;
import com.nextrole.common_dto.exception.JobPortalException;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

  // @Autowired
  // private UserDetailsService userDetailsService;

  // @Autowired
  // private AuthenticationManager authenticationManager;

  // @Autowired
  // private JwtHelper jwtHelper;



  @Autowired
  private AuthService authService;

  @GetMapping("/email")
  public ResponseEntity<UserDTO> getUserById(@RequestParam String email) {
    return new ResponseEntity<>(authService.getUserByEmail(email), HttpStatus.OK);

  }
  
  
  @PostMapping("/login")
  public ResponseEntity<UserDTO> loginUser(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException  {
    return new ResponseEntity<>(authService.loginUser(loginDTO), HttpStatus.OK);
  }


  @PostMapping("/sendOtp/{email}")
  public ResponseEntity<ResponseDTO> sendOtp(@PathVariable @Email(message = "{user.email.invalid}") String email) throws Exception  {
    Boolean check = authService.sendOtp(email);
    return new ResponseEntity<>(new ResponseDTO(check ? "OTP sent successfully":"Something Went Wrong!!!"), HttpStatus.OK);
  }


  @GetMapping("/verifyOtp/{email}/{otp}")
  public ResponseEntity<ResponseDTO> verifyOtp(@PathVariable @Email(message = "{user.email.invalid}") String email, @PathVariable @Pattern(regexp = "^[0-9]{6}$", message = "{otp.invalid}") String otp) throws JobPortalException  {
    authService.verifyOtp(email, otp);
    return new ResponseEntity<>(new ResponseDTO("OTP has been verified successfully."), HttpStatus.OK);
  }


// @PostMapping("/jwt/token")
//   public ResponseEntity<?> createAuthToken(@RequestBody AuthenticationRequest req) {
//     authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
//     final UserDetails userDetails = userDetailsService.loadUserByUsername(req.getEmail());
//     final String jwt = jwtHelper.generateToken(userDetails);
//     return ResponseEntity.ok(new AuthenticationResponse(jwt));
//   }

  
  
}