package com.nextrole.common_dto.kafka;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserChangePassEvent {
  private String userId;
  private String name;
  private String email;
    private LocalDateTime timestamp;

}
