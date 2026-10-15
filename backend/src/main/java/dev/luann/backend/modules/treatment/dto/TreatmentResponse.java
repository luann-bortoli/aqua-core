package dev.luann.backend.modules.treatment.dto;

import dev.luann.backend.shared.enums.ContentStatus;

import java.util.UUID;

public record TreatmentResponse(
        UUID id,
        String name,
        String summary,
        ContentStatus status,
        UUID subGroupId,
        UUID productId,
        TreatmentContent content
) {}
