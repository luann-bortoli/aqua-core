package dev.luann.backend.modules.product.dto;

import dev.luann.backend.shared.enums.ContentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record ProductRequest(

        @NotBlank
        String title,

        @NotNull
        ContentStatus status,

        @NotNull
        MultipartFile image

) {}
