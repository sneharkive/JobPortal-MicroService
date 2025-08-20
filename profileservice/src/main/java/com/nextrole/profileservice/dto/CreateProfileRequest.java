package com.nextrole.profileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProfileRequest {
    private String userId;
    private String email;
    private String name;
}
