package dev.luann.backend.modules.treatment.subgroup;

import dev.luann.backend.modules.treatment.group.TreatmentGroup;
import dev.luann.backend.modules.treatment.group.TreatmentGroupService;
import dev.luann.backend.modules.treatment.subgroup.dto.TreatmentSubGroupPatchRequest;
import dev.luann.backend.modules.treatment.subgroup.dto.TreatmentSubGroupRequest;
import dev.luann.backend.modules.treatment.subgroup.dto.TreatmentSubGroupResponse;
import dev.luann.backend.shared.exception.NoChangesException;
import dev.luann.backend.shared.exception.ResourceNotFoundException;
import dev.luann.backend.shared.pagination.PaginationMapper;
import dev.luann.backend.shared.pagination.dto.PageResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TreatmentSubGroupService
{
    private final TreatmentSubGroupRepository repository;
    private final TreatmentSubGroupMapper mapper;
    private final PaginationMapper paginationMapper;
    private final TreatmentGroupService groupService;

    public TreatmentSubGroup findSubGroupById(UUID id)
    {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment sub-group", id));
    }

    public TreatmentSubGroupResponse findById(UUID id)
    {
        return mapper.toResponse(findSubGroupById(id));
    }

    public PageResponse<TreatmentSubGroupResponse> findAll(Pageable pageable)
    {
        Page<TreatmentSubGroupResponse> page = repository.findAll(pageable)
                .map(mapper::toResponse);

        return paginationMapper.toResponse(page);
    }

    public PageResponse<TreatmentSubGroupResponse> findByGroup(UUID id, Pageable pageable)
    {
        Page<TreatmentSubGroupResponse> page = repository.findByGroupId(id, pageable)
                .map(mapper::toResponse);

        return paginationMapper.toResponse(page);
    }

    @Transactional
    public TreatmentSubGroupResponse create(TreatmentSubGroupRequest request)
    {
        TreatmentSubGroup target = mapper.toEntity(request);

        return mapper.toResponse(repository.save(target));
    }

    @Transactional
    public TreatmentSubGroupResponse patch(TreatmentSubGroupPatchRequest request, UUID id)
    {
        boolean hasNewName = (request.name() != null);
        boolean hasNewGroup = (request.groupId() != null);

        if (!hasNewGroup && !hasNewName) throw new NoChangesException();

        TreatmentSubGroup target = findSubGroupById(id);

        if (hasNewName) { target.setName(request.name()); }
        if (hasNewGroup) {
            TreatmentGroup targetGroup = groupService.findGroupById(request.groupId());
            target.setGroup(targetGroup);
        }

        return mapper.toResponse(repository.save(target));
    }

    @Transactional
    public void delete(UUID id)
    {
        TreatmentSubGroup target = findSubGroupById(id);
        repository.delete(target);
    }

}
