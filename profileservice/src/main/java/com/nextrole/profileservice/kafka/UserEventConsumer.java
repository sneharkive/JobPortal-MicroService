package com.nextrole.profileservice.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.exception.JobPortalException;
import com.nextrole.common_dto.kafka.UserCreatedEvent;
import com.nextrole.profileservice.service.ProfileService;

@Service
public class UserEventConsumer {

    private final ProfileService profileService;

    public UserEventConsumer(ProfileService profileService) {
        this.profileService = profileService;
    }

    @KafkaListener(topics = "user-created-events", groupId = "job-portal-group", containerFactory = "userCreatedKafkaListenerContainerFactory")
    public void consume(UserCreatedEvent event) throws JobPortalException {
        System.out.println("📥 Received Kafka Event: " + event.getEmail());

        // if (AccountType.APPLICANT.equals(event.getAccountType())) {
            profileService.createProfile(event.getUserId(), event.getEmail(), event.getName(), event.getAccountType());
        // }
    }
}

