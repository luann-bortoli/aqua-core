package dev.luann.backend.modules.product.dto;

import dev.luann.backend.shared.enums.ContentStatus;
import org.springframework.web.multipart.MultipartFile;

public record ProductPatchRequest(

        String title,
        ContentStatus status,
        MultipartFile image

) {
}
