package com.nextrole.notificationservice.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.kafka.AuthOtpEvent;
import com.nextrole.notificationservice.service.NotificationService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthEventConsumer {
  
  @Autowired
    private NotificationService notificationService;

    @KafkaListener(topics = "auth-events", groupId = "notification-group", containerFactory = "authOTPKafkaListenerContainerFactory")
    public void consumeUserCreated(AuthOtpEvent event) {
        log.info("📩 Received UserCreatedEvent: {}", event.getEmail());

        try {
            notificationService.sendOtpMail(event);
        } catch (Exception e) {
            System.err.println("Failed to send mail: " + e.getMessage());
        }
    }
}
