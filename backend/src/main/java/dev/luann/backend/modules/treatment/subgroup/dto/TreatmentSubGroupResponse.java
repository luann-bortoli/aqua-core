package dev.luann.backend.modules.treatment.subgroup.dto;

import dev.luann.backend.modules.treatment.Treatment;
import dev.luann.backend.modules.treatment.group.TreatmentGroup;

import java.util.List;
import java.util.UUID;

public record TreatmentSubGroupResponse(

        UUID id,
        String name,
        UUID groupId
)
{
}
