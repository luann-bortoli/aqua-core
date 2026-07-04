package dev.luann.backend.modules.pool.dto;

import dev.luann.backend.shared.enums.ContentStatus;
import org.springframework.web.multipart.MultipartFile;

public record PoolPatchRequest(

        String title,

        ContentStatus status,

        MultipartFile image

)
{
}
