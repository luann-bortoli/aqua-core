package dev.luann.backend.modules.treatment.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

public record TreatmentStep(

        UUID id,

        @NotBlank
        @Size(max = 64)
        String title,

        @NotBlank
        @Size(max = 128)
        String summary,

        String image,

        @Valid
        @NotEmpty
        List<StepTopic> topics
) {}
