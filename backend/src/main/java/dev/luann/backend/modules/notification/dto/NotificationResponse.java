package dev.luann.backend.modules.notification.dto;

import java.util.UUID;

public record NotificationResponse(

        UUID id,
        String title,
        String description

) {}
