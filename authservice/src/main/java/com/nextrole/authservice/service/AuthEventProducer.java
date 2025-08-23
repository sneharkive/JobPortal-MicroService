package com.nextrole.authservice.service;

import org.springframework.stereotype.Service;

import com.nextrole.common_dto.kafka.AuthOtpEvent;

import org.springframework.kafka.core.KafkaTemplate;

@Service
public class AuthEventProducer {
  private static final String TOPIC = "auth-events";

  private final KafkaTemplate<String, Object> kafkaTemplate ;

  public AuthEventProducer(KafkaTemplate<String, Object> kafkaTemplate){
      this.kafkaTemplate = kafkaTemplate;
  }


    public void sendOtpGenerateEvent(AuthOtpEvent event) {
        kafkaTemplate.send(TOPIC, event.getEmail(), event);
        System.out.println("Sent AuthOtpEvent Event: " + event.getEmail());
    }

}
