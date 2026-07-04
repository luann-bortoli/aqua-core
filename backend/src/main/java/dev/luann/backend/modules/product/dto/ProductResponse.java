package dev.luann.backend.modules.product.dto;

import dev.luann.backend.shared.enums.ContentStatus;

import java.util.UUID;

public record ProductResponse(

        UUID id,
        String title,
        ContentStatus status,
        String image

){}
