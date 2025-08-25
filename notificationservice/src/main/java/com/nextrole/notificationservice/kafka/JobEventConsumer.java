package com.nextrole.notificationservice.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.kafka.JobPostedEvent;
import com.nextrole.notificationservice.service.NotificationService;

import lombok.extern.slf4j.Slf4j;

import com.nextrole.common_dto.kafka.JobAppliedEvent;
import com.nextrole.common_dto.kafka.JobApplicationStatusChangedEvent;

@Service
@Slf4j
public class JobEventConsumer {

    @Autowired
    private NotificationService notificationService;

    @KafkaListener(topics = "job-posted-events", groupId = "notification-group", containerFactory = "jobPostedKafkaListenerContainerFactory")
    public void consumeJobPosted(JobPostedEvent event) {
        log.info("📩 Notification: New Job Posted -> " + event.getJobTitle() + " at " + event.getCompany());

        notificationService.saveNotification(
                Long.parseLong(event.getPostedBy()),
                null,
                "New Job Posted",
                "Job " + event.getJobTitle() + " posted at " + event.getCompany());
    }

    @KafkaListener(topics = "job-applied-events", groupId = "notification-group", containerFactory = "jobAppliedKafkaListenerContainerFactory")
    public void consumeJobApplied(JobAppliedEvent event) {
        log.info("📩 Notification: Applicant " + event.getApplicantName() + " applied for Job ID " + event.getJobId());

        notificationService.saveNotification(
                Long.parseLong(event.getApplicantId()),
                event.getApplicantEmail(),
                "Job Application Submitted",
                "You applied for job ID: " + event.getJobId());
    }

    @KafkaListener(topics = "job-appstatus-events", groupId = "notification-group", containerFactory = "jobAppStatusKafkaListenerContainerFactory")
    public void consumeJobAppStatus(JobApplicationStatusChangedEvent event) {
        log.info("📩 Notification: Application status changed for applicant " + event.getApplicantId() + " -> "
                + event.getApplicationStatus());

        notificationService.saveNotification(
                Long.parseLong(event.getApplicantId()),
               null,
                "Application Status Update",
                "Your application status: " + event.getApplicationStatus());
    }
}
