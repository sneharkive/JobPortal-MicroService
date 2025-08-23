package com.nextrole.notificationservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nextrole.common_dto.dto.ResponseDTO;
import com.nextrole.common_dto.exception.JobPortalException;
import com.nextrole.notificationservice.model.Notification;
import com.nextrole.notificationservice.service.NotificationService;


@RestController
@CrossOrigin
@Validated
@RequestMapping("/notification")
public class NotificationController {
  @Autowired
  private NotificationService notiService;

  @GetMapping("/get/{userId}")
  public ResponseEntity<List<Notification>> getNotifications(@PathVariable Long userId) throws JobPortalException{
    return new ResponseEntity<>(notiService.getUnreadNotification(userId), HttpStatus.OK);
  }


  @PutMapping("/read/{id}")
  public ResponseEntity<ResponseDTO> readNotifications(@PathVariable Long id) throws JobPortalException{
    notiService.readNotification(id);
    return new ResponseEntity<>(new ResponseDTO("Success"), HttpStatus.OK);
  }


  @DeleteMapping("/delete/{id}")
  public ResponseEntity<ResponseDTO> deleteNotifications(@PathVariable Long id) throws JobPortalException{
    notiService.deleteNotification(id);
    return new ResponseEntity<>(new ResponseDTO("Notification Delete SuccessFully"), HttpStatus.OK);
  }

  
}
