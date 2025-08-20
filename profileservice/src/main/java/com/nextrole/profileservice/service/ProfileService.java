package com.nextrole.profileservice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.exception.JobPortalException;
import com.nextrole.profileservice.dto.ProfileDTO;
import com.nextrole.profileservice.model.Profile;
import com.nextrole.profileservice.repository.ProfileRepository;

@Service
public class ProfileService {

  @Autowired
  private ProfileRepository profileRepository;

  public String createProfile(String userId, String email, String name) {
    // ✅ If profile already exists, just return its ID
    return profileRepository.findByUserId(userId)
        .map(Profile::getId)
        .orElseGet(() -> {
          Profile profile = new Profile();
          profile.setUserId(userId);
          profile.setEmail(email);
          profile.setName(name);
          profile.setSkills(new ArrayList<>());
          profile.setExperiences(new ArrayList<>());
          profile.setCertifications(new ArrayList<>());
          profileRepository.save(profile);
          return profile.getId();
        });
  }

  public ProfileDTO getProfile(String id) throws JobPortalException {
    return profileRepository.findById(id).orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND")).toDTO();
  }

  // public ProfileDTO updateProfile(ProfileDTO profileDTO) throws
  // JobPortalException {
  // profileRepository.findById(profileDTO.getId()).orElseThrow(() -> new
  // JobPortalException("PROFILE_NOT_FOUND"));
  // profileRepository.save(profileDTO.toEntity());
  // return profileDTO;
  // }

  public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException {
    Profile existingProfile = profileRepository.findById(profileDTO.getId())
        .orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));

    Profile updatedProfile = profileDTO.toEntity(); // convert DTO → Entity
    updatedProfile.setId(existingProfile.getId()); // ensure same ID

    Profile saved = profileRepository.save(updatedProfile); // save Entity
    return saved.toDTO(); // return Entity → DTO
  }

  public List<ProfileDTO> getAllProfile() throws JobPortalException {
    return profileRepository.findAll().stream().map((x) -> x.toDTO()).toList();
  }

}
