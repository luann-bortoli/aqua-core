package dev.luann.backend.modules.product.dto;

import dev.luann.backend.shared.entity.enums.ContentStatus;

public record ProductPatchRequest(

        String title,
        ContentStatus status,
        String image

) {
}
