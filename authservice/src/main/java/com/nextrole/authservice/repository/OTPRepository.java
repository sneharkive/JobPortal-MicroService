package com.nextrole.authservice.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nextrole.authservice.model.OTP;

@Repository
public interface OTPRepository extends JpaRepository<OTP, String> {
  // Iterable<? extends OTP> findByCreatedAtBefore(LocalDateTime expiry);

  List<OTP> findByCreationTimeBefore(LocalDateTime expiry);

  
}
