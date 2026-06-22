package dev.luann.backend.modules.pool.dto;

import dev.luann.backend.shared.entity.enums.ContentStatus;

public record PoolPatchRequest(

        String title,

        ContentStatus status,

        String image

)
{
}
