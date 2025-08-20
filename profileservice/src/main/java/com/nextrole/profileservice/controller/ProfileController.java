package com.nextrole.profileservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nextrole.profileservice.dto.ProfileDTO;
import com.nextrole.profileservice.exception.JobPortalException;
import com.nextrole.profileservice.service.ProfileService;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/profiles")
public class ProfileController {

  @Autowired
  private ProfileService profileService;

  @PostMapping("/create")
  public ResponseEntity<String> createProfile(
      @RequestParam String email,
      @RequestParam String name) {
    String profileId = profileService.createProfile(email, name);
    return new ResponseEntity<>(profileId, HttpStatus.CREATED);
  }

  @GetMapping("/get/{id}")
  public ResponseEntity<ProfileDTO> getProfile(@PathVariable String id) throws JobPortalException {
    return new ResponseEntity<>(profileService.getProfile(id), HttpStatus.OK);
  }

  @GetMapping("/getAll")
  public ResponseEntity<List<ProfileDTO>> getAllProfile() throws JobPortalException {
    return new ResponseEntity<>(profileService.getAllProfile(), HttpStatus.OK);
  }

  @PutMapping("/update")
  public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) throws JobPortalException {
    return new ResponseEntity<>(profileService.updateProfile(profileDTO), HttpStatus.OK);
  }

}
