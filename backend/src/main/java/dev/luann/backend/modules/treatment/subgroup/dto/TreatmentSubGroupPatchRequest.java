package dev.luann.backend.modules.treatment.subgroup.dto;

import java.util.UUID;

public record TreatmentSubGroupPatchRequest(

        String name,
        UUID groupId

)
{
}
