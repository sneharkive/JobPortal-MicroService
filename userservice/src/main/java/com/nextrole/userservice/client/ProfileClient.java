package com.nextrole.userservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "profileservice", path = "/profiles")
public interface ProfileClient {
    @DeleteMapping("/delete/{profileId}")
    void deleteProfile(@PathVariable String profileId);
}
