package com.nextrole.messageservice.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

// import com.nextrole.messageservice.dto.MessageStatus;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "chats")
public class ChatMessage {

    @Id
    private String id;

    private Long senderId;
    private Long receiverId;
    private String content;
    // private String fileId;
    // private MessageStatus status = MessageStatus.SENT; // SENT, DELIVERED, READ

    @CreatedDate
    private Instant createdAt;

    // private Instant deliveredAt;
    // private Instant readAt;

    // @LastModifiedDate
    // private Instant updatedAt;

}
