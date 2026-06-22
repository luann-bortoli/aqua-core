package dev.luann.backend.modules.user.dto;

import dev.luann.backend.modules.user.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRequest(

    @NotBlank
    @Size(min = 3, max = 100)
    String name,

    @NotNull
    UserRole role,

    @NotBlank
    @Email
    String email,

    @NotBlank
    @Size(min = 8, max = 100)
    String password

)
{}
