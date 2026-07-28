package dev.luann.backend.modules.treatment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record StepTopic(

        UUID id,

        @NotBlank
        @Size(max = 128)
        String summary,

        String image
) {}
