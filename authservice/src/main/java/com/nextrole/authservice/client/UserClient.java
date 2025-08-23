package com.nextrole.authservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import com.nextrole.authservice.dto.UserDTO;

@FeignClient(name = "userservice", path = "/users") 
public interface UserClient {

    @GetMapping("/getUser/{id}")
    UserDTO getUserById(@PathVariable Long id);
}
