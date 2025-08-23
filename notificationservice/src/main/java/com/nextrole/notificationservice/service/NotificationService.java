package com.nextrole.notificationservice.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.nextrole.common_dto.dto.NotificationStatus;
import com.nextrole.common_dto.exception.JobPortalException;
import com.nextrole.common_dto.kafka.AuthOtpEvent;
import com.nextrole.common_dto.kafka.UserChangePassEvent;
import com.nextrole.common_dto.kafka.UserCreatedEvent;
import com.nextrole.common_dto.kafka.UserDeletedEvent;
import com.nextrole.common_dto.kafka.UserLogInEvent;
import com.nextrole.common_dto.utility.AccountDeletedData;
import com.nextrole.common_dto.utility.LoginSuccessData;
import com.nextrole.common_dto.utility.OtpData;
import com.nextrole.common_dto.utility.PasswordChangedData;
import com.nextrole.common_dto.utility.WelcomeData;
import com.nextrole.notificationservice.dto.NotificationDTO;
import com.nextrole.notificationservice.model.Notification;

import com.nextrole.notificationservice.repository.NotificationRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class NotificationService {

  @Autowired
  private JavaMailSender mailSender;

  @Autowired
  private NotificationRepository notificationRepo;

  private void saveNotification(Long userId, String email, String subject, String message) {
    Notification noti = new Notification();
    noti.setUserId(userId);
    noti.setEmail(email);
    noti.setSubject(subject);
    noti.setMessage(message);
    noti.setStatus(NotificationStatus.UNREAD);
    noti.setTimestamp(LocalDateTime.now());
    notificationRepo.save(noti);
}


  public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException {
    notificationDTO.setStatus(NotificationStatus.UNREAD);
    notificationDTO.setTimestamp(LocalDateTime.now());
    notificationRepo.save(notificationDTO.toEntity());
  }

  public List<Notification> getUnreadNotification(Long userId) throws JobPortalException {
    return notificationRepo.findByUserIdAndStatus(userId, NotificationStatus.UNREAD);
  }

  public List<Notification> getAllNotifications(Long userId) throws JobPortalException {
    return notificationRepo.findByUserId(userId);
  }

  public void readNotification(Long id) throws JobPortalException {
    Notification noti = notificationRepo.findById(id)
        .orElseThrow(() -> new JobPortalException("No Notification Found"));

    noti.setStatus(NotificationStatus.READ);
    notificationRepo.save(noti);
  }

  public void deleteNotification(Long id) throws JobPortalException {
    Notification notification = notificationRepo.findById(id)
        .orElseThrow(() -> new JobPortalException("Notification not found with ID: " + id));

    notificationRepo.delete(notification);
  }

  public void sendWelcomeMail(UserCreatedEvent event) throws Exception {
    MimeMessage mm = mailSender.createMimeMessage();
    MimeMessageHelper message = new MimeMessageHelper(mm, true);
    message.setTo(event.getEmail());
    message.setSubject("Welcome To NextRole");

    String body = WelcomeData.getWelcomeMessage(
        event.getName(),
        event.getTimestamp(),
        event.getUserId(),
        event.getAccountType());

    message.setText(body, true);
    mailSender.send(mm);

    saveNotification(Long.parseLong(event.getUserId()), event.getEmail(), "Welcome To NextRole", "Welcome " + event.getName() + "!");
  }

  public void sendAccDelMail(UserDeletedEvent event) throws MessagingException {
    MimeMessage mm = mailSender.createMimeMessage();
    MimeMessageHelper message = new MimeMessageHelper(mm, true);
    message.setTo(event.getEmail());
    message.setSubject("Delete NextRole Account");

    String body = AccountDeletedData.getAccountDeletedMessage(
        event.getName(),
        LocalDateTime.now(),
        event.getUserId());

    message.setText(body, true);
    mailSender.send(mm);

    saveNotification(Long.parseLong(event.getUserId()), event.getEmail(), "Delete NextRole Account", "Delete " + event.getName() + "!");

  }

public void sendChangePassMail(UserChangePassEvent event) throws MessagingException {
      MimeMessage mm = mailSender.createMimeMessage();
    MimeMessageHelper message = new MimeMessageHelper(mm, true);
    message.setTo(event.getEmail());
    message.setSubject("Password Change");
    String body = PasswordChangedData.getPasswordChangedMessage(
        event.getName(), 
        LocalDateTime.now(), 
        event.getUserId());
    message.setText(body, true); 
    mailSender.send(mm);

    saveNotification(Long.parseLong(event.getUserId()), event.getEmail(), "Password Change ", "Password " + event.getName() + "!");

}

  public void sendLogInMail(UserLogInEvent event) throws MessagingException  {
    MimeMessage mm = mailSender.createMimeMessage();
    MimeMessageHelper message = new MimeMessageHelper(mm, true);
    message.setTo(event.getEmail());
    message.setSubject("Log In Successfully");


        String body = LoginSuccessData.getLoginSuccessMessage(
        event.getName(), 
        event.getUserId(),
        event.getEmail(),
        LocalDateTime.now()
    );
    message.setText(body, true); 
    mailSender.send(mm);

    saveNotification(Long.parseLong(event.getUserId()), event.getEmail(), "Login to NextRole Account", "Login " + event.getName() + "!");

  }

  public void sendOtpMail(AuthOtpEvent event) throws MessagingException  {
    MimeMessage mm = mailSender.createMimeMessage();
    MimeMessageHelper message = new MimeMessageHelper(mm, true);
    message.setTo(event.getEmail());
    message.setSubject("Your OTP for NextRole");


        String body = OtpData.getOtpMail(
          event.getOtpCode(),
        event.getEmail()
    );
    message.setText(body, true); 
    mailSender.send(mm);

    saveNotification(null, event.getEmail(), "Your OTP for NextRole", "OTP: " + event.getOtpCode());
  }

}
