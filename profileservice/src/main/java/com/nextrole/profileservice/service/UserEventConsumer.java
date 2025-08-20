package com.nextrole.profileservice.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.dto.AccountType;
import com.nextrole.common_dto.dto.UserCreatedEvent;
import com.nextrole.common_dto.exception.JobPortalException;

@Service
public class UserEventConsumer {

    private final ProfileService profileService;

    public UserEventConsumer(ProfileService profileService) {
        this.profileService = profileService;
    }

    @KafkaListener(topics = "user-events", groupId = "job-portal-group")
    public void consume(UserCreatedEvent event) throws JobPortalException {
        System.out.println("📥 Received Kafka Event: " + event.getEmail());

        if (AccountType.APPLICANT.equals(event.getAccountType())) {
            profileService.createProfile(event.getUserId(), event.getEmail(), event.getName());
        }
    }
}

