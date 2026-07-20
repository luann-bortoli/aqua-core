package dev.luann.backend.modules.treatment.group.dto;

import dev.luann.backend.modules.treatment.subgroup.TreatmentSubGroup;

import java.util.List;
import java.util.UUID;

public record TreatmentGroupResponse
        (

        UUID id,
        String name
)
{
}
