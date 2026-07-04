package dev.luann.backend.modules.pool.dto;

import dev.luann.backend.shared.enums.ContentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record PoolRequest(

        @NotBlank
        String title,

        @NotNull
        ContentStatus status,

        @NotNull
        MultipartFile image

){}
