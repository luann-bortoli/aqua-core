package dev.luann.backend.modules.profile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record ProfileRequest(

        UUID id,
        // Accepts null, blank and values with 3+ characters
        @Pattern(regexp = "^$|^.{3,}$")
        String newName,

        // Accepts null, blank and values with 8+ characters
        @Pattern(regexp = "^$|^.{8,}$")
        String newPassword,

        @NotBlank
        String currentPassword

)
{
}
