package com.nextrole.userservice.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.nextrole.userservice.dto.UserCreatedEvent;

@Service
public class UserEventProducer {

    private static final String TOPIC = "user-events";

    private final KafkaTemplate<String, UserCreatedEvent> kafkaTemplate;

    public UserEventProducer(KafkaTemplate<String, UserCreatedEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendUserCreatedEvent(UserCreatedEvent event) {
        kafkaTemplate.send(TOPIC, event.getUserId(), event);
        System.out.println("📤 Sent Kafka Event: " + event.getEmail());
    }
}
