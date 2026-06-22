package dev.luann.backend.modules.notification.dto;

import jakarta.validation.constraints.NotBlank;

public record NotificationRequest(

        @NotBlank
        String title,

        @NotBlank
        String description

){}
