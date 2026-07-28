package dev.luann.backend.modules.treatment.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record TreatmentContent(

        @Valid
        @NotEmpty
        List<TreatmentStep> steps
) {}
