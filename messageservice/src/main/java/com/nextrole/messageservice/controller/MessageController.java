package com.nextrole.messageservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nextrole.messageservice.model.ChatMessage;
import com.nextrole.messageservice.service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

  public MessageService msgService;

  @PostMapping("/send")
  public ResponseEntity<String> sendMessage(@RequestBody ChatMessage message) {
    return ResponseEntity.ok(msgService.sendMessage(message));
  }
}

