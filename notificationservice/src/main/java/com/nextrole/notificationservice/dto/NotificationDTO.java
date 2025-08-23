package com.nextrole.notificationservice.dto;

import java.time.LocalDateTime;

import com.nextrole.common_dto.dto.NotificationStatus;
import com.nextrole.notificationservice.model.Notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
 private Long id;
  private Long userId;
  private String message;
  private String email; 
  private String subject; 
  private String action;
  private String route;
  private NotificationStatus status;
  private LocalDateTime timestamp;

  public Notification toEntity(){
    return new Notification(this.id, this.userId, this.email, this.message, this.subject, this.action, this.route, this.status, this.timestamp);
  }
}
