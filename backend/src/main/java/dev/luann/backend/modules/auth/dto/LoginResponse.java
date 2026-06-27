package dev.luann.backend.modules.auth.dto;

import dev.luann.backend.modules.user.enums.UserRole;

import java.util.UUID;

public record LoginResponse(
        UUID id,
        String name,
        String email,
        UserRole role,
        String message
)
{}