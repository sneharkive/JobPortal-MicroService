package com.nextrole.common_dto.kafka;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthOtpEvent {
  private String email;

  private String otpCode;

  private LocalDateTime creationTime;
}
