package com.nextrole.notificationservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nextrole.common_dto.dto.NotificationStatus;
import com.nextrole.notificationservice.model.Notification;



@Repository
public interface NotificationRepository extends  JpaRepository<Notification, Long> {
  public List<Notification> findByUserIdAndStatus(Long userId, NotificationStatus status);

  public List<Notification> findByUserId(Long userId);
}
