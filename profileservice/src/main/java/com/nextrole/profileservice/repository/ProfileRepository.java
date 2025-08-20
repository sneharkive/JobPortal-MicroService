package com.nextrole.profileservice.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nextrole.profileservice.model.Profile;

@Repository
public interface ProfileRepository extends MongoRepository<Profile, String>{

  Optional<Profile> findByUserId(String userId);
  
}
