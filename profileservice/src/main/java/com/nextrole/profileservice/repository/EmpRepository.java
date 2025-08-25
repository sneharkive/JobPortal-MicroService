package com.nextrole.profileservice.repository;


import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nextrole.profileservice.model.EmpProfile;

@Repository
public interface EmpRepository extends MongoRepository<EmpProfile, String>{

  Optional<EmpProfile> findByUserId(String userId);
  
}