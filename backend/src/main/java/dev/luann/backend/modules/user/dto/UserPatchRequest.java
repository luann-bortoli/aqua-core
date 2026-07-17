package dev.luann.backend.modules.user.dto;

import dev.luann.backend.modules.user.enums.UserRole;

public record UserPatchRequest(

        String name,
        UserRole role

)
{}
