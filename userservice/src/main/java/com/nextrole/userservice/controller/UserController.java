package com.nextrole.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nextrole.userservice.dto.UserDTO;
import com.nextrole.userservice.exception.JobPortalException;
import com.nextrole.userservice.service.UserService;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
@Validated
@RequestMapping("/users")
public class UserController {
  
  @Autowired
  private UserService userService;

  @PostMapping("/register")
  public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) throws JobPortalException  {
    userDTO = userService.registerUser(userDTO);
    return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
  }

  // By Me
  @GetMapping("/getUser/{id}")
  public ResponseEntity<UserDTO> verifyOtp(@PathVariable  Long id) throws JobPortalException  {
    return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
  }


}
