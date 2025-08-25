package com.nextrole.notificationservice.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.kafka.UserCreatedEvent;
import com.nextrole.common_dto.kafka.UserDeletedEvent;
import com.nextrole.common_dto.kafka.UserChangePassEvent;
import com.nextrole.common_dto.kafka.UserLogInEvent;
import com.nextrole.notificationservice.service.NotificationService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserEventConsumer {

    @Autowired
    private NotificationService notificationService;

    @KafkaListener(topics = "user-created-events", groupId = "notification-group", containerFactory = "userCreatedKafkaListenerContainerFactory")
    public void consumeUserCreated(UserCreatedEvent event) {
        log.info("📩 Received UserCreatedEvent: {}", event.getEmail());

        try {
            notificationService.sendWelcomeMail(event);
        } catch (Exception e) {
            System.err.println("Failed to send mail: " + e.getMessage());
        }
    }

    @KafkaListener(topics = "user-delete-events", groupId = "notification-group", containerFactory = "userDeletedKafkaListenerContainerFactory")
    public void consumeUserDeleted(UserDeletedEvent event) {
        log.info("🗑️ Received UserDeletedEvent: {}", event.getEmail());
        // Send account deletion notification

        try {
            notificationService.sendAccDelMail(event);
        } catch (Exception e) {
            System.err.println("Failed to send mail: " + e.getMessage());
        }
    }

    @KafkaListener(topics = "user-changepass-events", groupId = "notification-group", containerFactory = "userChangePassKafkaListenerContainerFactory")
    public void consumeUserChangePass(UserChangePassEvent event) {
        log.info("🔑 Received UserChangePassEvent: {}", event.getEmail());
        // Send password change alert

        try {
            notificationService.sendChangePassMail(event);
        } catch (Exception e) {
            System.err.println("Failed to send mail: " + e.getMessage());
        }

    }

    @KafkaListener(topics = "user-login-events", groupId = "notification-group", containerFactory = "userLoginKafkaListenerContainerFactory")
    public void consumeUserLogIn(UserLogInEvent event) {
        log.info("🔐 Received UserLogInEvent: {}", event.getEmail());
        // Send login alert (with device info if included)

        try {
            notificationService.sendLogInMail(event);
        } catch (Exception e) {
            System.err.println("Failed to send mail: " + e.getMessage());
        }
    }
}
