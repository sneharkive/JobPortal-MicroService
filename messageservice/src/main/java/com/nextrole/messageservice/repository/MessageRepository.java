package com.nextrole.messageservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.nextrole.messageservice.model.ChatMessage;

public interface MessageRepository extends MongoRepository<ChatMessage, String> {
  
}
