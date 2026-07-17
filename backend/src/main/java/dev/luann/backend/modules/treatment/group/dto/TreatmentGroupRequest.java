package dev.luann.backend.modules.treatment.group.dto;

import dev.luann.backend.modules.treatment.subgroup.TreatmentSubGroup;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record TreatmentGroupRequest(

        @NotBlank
        String name

)
{
}
