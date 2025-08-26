package com.nextrole.profileservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.nextrole.common_dto.dto.CreateProfileRequest;
import com.nextrole.common_dto.exception.JobPortalException;
import com.nextrole.profileservice.dto.EmpProDTO;
import com.nextrole.profileservice.dto.ProfileDTO;
import com.nextrole.profileservice.service.ProfileService;

@RestController
// @CrossOrigin
@Validated
@RequestMapping("/profiles")
public class ProfileController {

  @Autowired
  private ProfileService profileService;


  @PostMapping("/create")
public ResponseEntity<String> createProfile(@RequestBody CreateProfileRequest request) throws JobPortalException {
    String profileId = profileService.createProfile(
        request.getUserId(), request.getEmail(), request.getName(), request.getAccountType()
    );
    return new ResponseEntity<>(profileId, HttpStatus.CREATED);
}

  @GetMapping("/get/{userId}")
  public ResponseEntity<ProfileDTO> getProfile(@PathVariable String userId) throws JobPortalException {
    return new ResponseEntity<>(profileService.getProfile(userId), HttpStatus.OK);
  }

  @GetMapping("/getAll")
  public ResponseEntity<List<ProfileDTO>> getAllProfile() throws JobPortalException {
    return new ResponseEntity<>(profileService.getAllProfile(), HttpStatus.OK);
  }

  @PutMapping("/update")
  public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) throws JobPortalException {
    return new ResponseEntity<>(profileService.updateProfile(profileDTO), HttpStatus.OK);
  }

  
  @DeleteMapping("/delete/{profileId}")
  public ResponseEntity<String> deleteProfile(@PathVariable String profileId) throws JobPortalException {
    return new ResponseEntity<>(profileService.deleteProfile(profileId), HttpStatus.OK);
  }
  
  @PutMapping("/updateEmp")
  public ResponseEntity<EmpProDTO> updateEmpProfile(@RequestBody EmpProDTO empDTO) throws JobPortalException {
    return new ResponseEntity<>(profileService.updateEmpProfile(empDTO), HttpStatus.OK);
  }

    @GetMapping("/getEmp/{userId}")
  public ResponseEntity<EmpProDTO> getEmpProfile(@PathVariable String userId) throws JobPortalException {
    return new ResponseEntity<>(profileService.getEmpProfile(userId), HttpStatus.OK);
  }

  @GetMapping("/getAllEmp")
  public ResponseEntity<List<EmpProDTO>> getAllEmpProfile() throws JobPortalException {
    return new ResponseEntity<>(profileService.getAllEmpProfile(), HttpStatus.OK);
  }

}
