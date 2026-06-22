package dev.luann.backend.modules.pool.dto;

import dev.luann.backend.shared.entity.enums.ContentStatus;

import java.util.UUID;

public record PoolResponse(

        UUID id,
        String title,
        ContentStatus Status,
        String image

)
{
}
