package dev.luann.backend.modules.pool.dto;

import dev.luann.backend.shared.entity.enums.ContentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PoolRequest(

        @NotBlank
        String title,

        @NotNull
        ContentStatus status,

        @NotBlank
        String image

){}
