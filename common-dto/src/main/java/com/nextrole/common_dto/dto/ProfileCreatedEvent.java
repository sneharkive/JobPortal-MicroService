package com.nextrole.common_dto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProfileCreatedEvent {
  private String userId;
  private String profileId;
}
