package com.nextrole.profileservice.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.nextrole.profileservice.dto.MediaContentType;
import com.nextrole.profileservice.dto.MediaType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "media")
public class Media {

    @Id
    private String id;   // Unique ID for media (e.g., pic_123)

    private String userId;  // Reference to Profile.id

    private MediaType type;    

    private MediaContentType contentType;  

    private byte[] data;    // File data (if <16MB), else use GridFS

    private LocalDateTime uploadedAt;
}
