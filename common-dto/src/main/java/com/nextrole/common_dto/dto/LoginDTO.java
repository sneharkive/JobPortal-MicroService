package com.nextrole.common_dto.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
  @NotBlank(message = "{user.email.absent}")
  private String email;

  @NotBlank(message = "{user.password.absent}")
  private String password;
}
