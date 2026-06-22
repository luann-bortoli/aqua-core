package dev.luann.backend.modules.user.dto;

import dev.luann.backend.modules.user.enums.UserRole;

public record UserPatchRequest(

        String name,
        String email,
        String password,
        UserRole role

)
{}
