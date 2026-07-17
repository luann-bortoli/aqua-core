package dev.luann.backend.modules.profile.dto;

import java.util.UUID;

public record ProfileResponse(

        UUID id,
        String name

)
{
}
