package dev.luann.backend.modules.treatment.group;

import dev.luann.backend.modules.treatment.group.dto.TreatmentGroupRequest;
import dev.luann.backend.modules.treatment.group.dto.TreatmentGroupResponse;
import org.springframework.stereotype.Component;

@Component
public class TreatmentGroupMapper
{
    public TreatmentGroupResponse toResponse(TreatmentGroup treatmentGroup)
    {
        return new TreatmentGroupResponse(
                treatmentGroup.getId(),
                treatmentGroup.getName()
        );
    }

    public TreatmentGroup toEntity(TreatmentGroupRequest treatmentGroupRequest)
    {
        TreatmentGroup treatmentGroup =  new TreatmentGroup();

        treatmentGroup.setName(treatmentGroupRequest.name());

        return treatmentGroup;
    }
}
