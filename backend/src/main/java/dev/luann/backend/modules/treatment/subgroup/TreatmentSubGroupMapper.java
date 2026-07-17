package dev.luann.backend.modules.treatment.subgroup;

import dev.luann.backend.modules.treatment.subgroup.dto.TreatmentSubGroupRequest;
import dev.luann.backend.modules.treatment.subgroup.dto.TreatmentSubGroupResponse;
import org.springframework.stereotype.Component;

@Component
public class TreatmentSubGroupMapper
{
    public TreatmentSubGroupResponse toResponse(TreatmentSubGroup treatmentSubGroup)
    {
        return new TreatmentSubGroupResponse(
                treatmentSubGroup.getId(),
                treatmentSubGroup.getName(),
                treatmentSubGroup.getGroup().getId()
        );
    }

    public TreatmentSubGroup toEntity(TreatmentSubGroupRequest request)
    {
        TreatmentSubGroup treatmentSubGroup = new TreatmentSubGroup();

        treatmentSubGroup.setName(request.name());

        return treatmentSubGroup;
    }
}
