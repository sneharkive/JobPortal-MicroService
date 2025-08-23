package com.nextrole.userservice.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.kafka.UserChangePassEvent;
import com.nextrole.common_dto.kafka.UserCreatedEvent;
import com.nextrole.common_dto.kafka.UserDeletedEvent;
import com.nextrole.common_dto.kafka.UserLogInEvent;

@Service
public class UserEventProducer {



    private final KafkaTemplate<String, Object> kafkaTemplate;

    public UserEventProducer(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendUserCreatedEvent(UserCreatedEvent event) {
        kafkaTemplate.send("user-created-events", event.getUserId(), event);
        System.out.println("Sent Kafka Event: " + event.getEmail());
    }

    public void sendUserDeletedEvent(UserDeletedEvent event) {
        kafkaTemplate.send("user-delete-events", event.getUserId(), event);
        System.out.println("Sent UserDeletedEvent for: " + event.getEmail());
    }

    public void sendUserChangePassEvent(UserChangePassEvent event) {
        kafkaTemplate.send("user-changepass-events", event.getUserId(), event);
        System.out.println("Sent UserChangePassEvent for: " + event.getEmail());
    }


    public void sendUserLogInEvent(UserLogInEvent event) {
        kafkaTemplate.send("user-login-events", event.getUserId(), event);
        System.out.println("Sent UserLogInEvent for: " + event.getEmail());
    }
    
}
