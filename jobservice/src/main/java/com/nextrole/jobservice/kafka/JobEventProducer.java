package com.nextrole.jobservice.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.kafka.JobPostedEvent;
import com.nextrole.common_dto.kafka.JobAppliedEvent;
import com.nextrole.common_dto.kafka.JobApplicationStatusChangedEvent;

@Service
public class JobEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public JobEventProducer(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendJobPostedEvent(JobPostedEvent event) {
        kafkaTemplate.send("job-posted-events", event.getJobId(), event);
        System.out.println("Sent JobPostedEvent for Job: " + event.getJobTitle());
    }

    public void sendJobAppliedEvent(JobAppliedEvent event) {
        kafkaTemplate.send("job-applied-events", event.getJobId(), event);
        System.out.println("Sent JobAppliedEvent for JobId: " + event.getJobId() + ", ApplicantId: " + event.getApplicantId());
    }

    public void sendJobAppStatusChangedEvent(JobApplicationStatusChangedEvent event) {
        kafkaTemplate.send("job-appstatus-events", event.getJobId(), event);
        System.out.println("Sent JobApplicationStatusChangedEvent for JobId: " + event.getJobId() + ", ApplicantId: " + event.getApplicantId());
    }
}
