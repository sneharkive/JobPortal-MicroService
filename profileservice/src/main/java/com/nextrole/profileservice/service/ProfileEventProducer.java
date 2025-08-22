package com.nextrole.profileservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.dto.ProfileCreatedEvent;

@Service
public class ProfileEventProducer {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    private static final String TOPIC = "profile-created";

    public void sendProfileCreatedEvent(ProfileCreatedEvent event) {
        kafkaTemplate.send(TOPIC, event);
    }
}
