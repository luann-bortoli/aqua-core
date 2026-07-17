package dev.luann.backend.modules.treatment.subgroup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record TreatmentSubGroupRequest(

        @NotBlank
        String name,

        @NotNull
        UUID groupId

) {}
