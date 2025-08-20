package com.nextrole.common_dto.dto;

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
    private AccountType accountType; // APPLICANT / RECRUITER

    // getters and setters
}

