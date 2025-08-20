package com.nextrole.userservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nextrole.userservice.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    public Optional<User> findByEmail(String email);
}
