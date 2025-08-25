package com.nextrole.common_dto.kafka;

import java.time.LocalDateTime;

import com.nextrole.common_dto.dto.ApplicationStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationStatusChangedEvent {
    private String jobId;
    private String applicantId;
    private ApplicationStatus applicationStatus;
    private LocalDateTime timestamp;
}