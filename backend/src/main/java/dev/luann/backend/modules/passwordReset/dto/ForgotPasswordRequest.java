package dev.luann.backend.modules.passwordReset.dto;

import jakarta.validation.constraints.NotBlank;

public record ForgotPasswordRequest(

        @NotBlank
        String email
) {
}
