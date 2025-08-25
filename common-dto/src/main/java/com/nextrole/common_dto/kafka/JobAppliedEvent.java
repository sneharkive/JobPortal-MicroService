package com.nextrole.common_dto.kafka;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobAppliedEvent {
    private String jobId;
    private String applicantId;
    private String applicantName;
    private String applicantEmail;
    private LocalDateTime timestamp;
}