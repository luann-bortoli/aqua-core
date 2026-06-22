package dev.luann.backend.modules.user.dto;

import dev.luann.backend.modules.user.enums.UserRole;

import java.util.UUID;

public record UserResponse(

        UUID id,

        String name,

        UserRole role,

        String email

)
{}
