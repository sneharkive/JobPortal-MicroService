package com.nextrole.userservice.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.dto.ProfileCreatedEvent;
import com.nextrole.userservice.repository.UserRepo;

@Service
public class ProfileEventConsumer {

    @Autowired
    private UserRepo userRepo;

    @KafkaListener(topics = "profile-created", groupId = "user-service-group")
    public void consume(ProfileCreatedEvent event) {
        userRepo.findById(Long.valueOf(event.getUserId())).ifPresent(user -> {
            user.setProfileId(event.getProfileId());
            userRepo.save(user);
        });
    }
}
