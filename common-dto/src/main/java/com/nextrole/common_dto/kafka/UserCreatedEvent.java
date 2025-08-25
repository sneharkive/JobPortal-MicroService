package com.nextrole.common_dto.kafka;

import java.time.LocalDateTime;

import com.nextrole.common_dto.dto.AccountType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreatedEvent {
    private String userId;
    private String email;
    private String name;
    private AccountType accountType; 
    private LocalDateTime timestamp;

    // getters and setters
}

