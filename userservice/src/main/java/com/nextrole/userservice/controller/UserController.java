package com.nextrole.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nextrole.common_dto.dto.LoginDTO;
import com.nextrole.common_dto.dto.ResponseDTO;
import com.nextrole.common_dto.exception.JobPortalException;
import com.nextrole.userservice.dto.UserDTO;
import com.nextrole.userservice.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
// @CrossOrigin
@Validated
@RequestMapping("/users")
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping("/register")
  public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) throws JobPortalException {
    userDTO = userService.registerUser(userDTO);
    return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<UserDTO> loginUser(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException {
    return new ResponseEntity<>(userService.loginUser(loginDTO), HttpStatus.OK);
  }

  @PostMapping("/changePass")
  public ResponseEntity<ResponseDTO> changePassword(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException {
    return new ResponseEntity<>(userService.changePassword(loginDTO), HttpStatus.OK);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable Long id) throws JobPortalException {
    return new ResponseEntity<>(userService.deleteUser(id), HttpStatus.OK);
  }

  @GetMapping("/getUser/{id}")
  public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) throws JobPortalException {
    return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
  }

  @GetMapping("/email")
  public ResponseEntity<UserDTO> getUserByEmail(@RequestParam String email) throws JobPortalException {
    return new ResponseEntity<>(userService.getUserByEmail(email), HttpStatus.OK);
  }

}
