package dev.luann.backend.modules.treatment.subgroup;

import dev.luann.backend.modules.treatment.group.TreatmentGroup;
import dev.luann.backend.modules.treatment.group.TreatmentGroupService;
import dev.luann.backend.modules.treatment.subgroup.dto.TreatmentSubGroupRequest;
import dev.luann.backend.modules.treatment.subgroup.dto.TreatmentSubGroupResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class TreatmentSubGroupMapper
{
    private final TreatmentGroupService groupService;

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

        TreatmentGroup targetGroup = groupService.findGroupById(request.groupId());
        treatmentSubGroup.setGroup(targetGroup);

        return treatmentSubGroup;
    }
}
