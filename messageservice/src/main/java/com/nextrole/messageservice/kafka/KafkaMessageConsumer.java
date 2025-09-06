package com.nextrole.messageservice.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.nextrole.messageservice.model.ChatMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KafkaMessageConsumer {

    private final SimpMessagingTemplate messagingTemplate; // WebSocket broadcaster

    @KafkaListener(topics = "chat-messages", groupId = "chat-app")
    public void consume(ChatMessage message) {
        // Push to WebSocket (Spring STOMP)
        messagingTemplate.convertAndSendToUser(
            message.getReceiverId().toString(),
            "/queue/messages",
            message
        );
    }
}

