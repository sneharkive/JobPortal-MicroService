package com.nextrole.common_dto.kafka;

import java.time.LocalDateTime;

import com.nextrole.common_dto.dto.JobStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPostedEvent {
    private String jobId;
    private String jobTitle;
    private String company;
    private String postedBy;
    private JobStatus jobStatus;
    private LocalDateTime timestamp;
}