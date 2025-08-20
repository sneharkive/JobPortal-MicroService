package com.nextrole.profileservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nextrole.profileservice.model.Profile;

@Repository
public interface ProfileRepository extends MongoRepository<Profile, String>{
  
}
