package com.nextrole.messageservice.service;

import org.springframework.stereotype.Service;

import com.nextrole.messageservice.kafka.KafkaMessageProducer;
import com.nextrole.messageservice.model.ChatMessage;
import com.nextrole.messageservice.repository.MessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {
  private final KafkaMessageProducer kafkaProducer;
  private final MessageRepository messageRepository;

  public String sendMessage(ChatMessage message) {
    // Save to MongoDB
    messageRepository.save(message);

    // Send event to Kafka
    kafkaProducer.sendMessage(message);

    return "Message Sent";
  }

}
