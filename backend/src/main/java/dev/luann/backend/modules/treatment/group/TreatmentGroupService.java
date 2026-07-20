package dev.luann.backend.modules.treatment.group;

import dev.luann.backend.modules.treatment.group.dto.TreatmentGroupRequest;
import dev.luann.backend.modules.treatment.group.dto.TreatmentGroupResponse;
import dev.luann.backend.modules.treatment.subgroup.TreatmentSubGroup;
import dev.luann.backend.modules.treatment.subgroup.TreatmentSubGroupRepository;
import dev.luann.backend.modules.treatment.subgroup.TreatmentSubGroupService;
import dev.luann.backend.shared.exception.DependentResourcesException;
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
public class TreatmentGroupService
{
    private final TreatmentGroupRepository repository;
    private final TreatmentGroupMapper mapper;
    private final PaginationMapper paginationMapper;
    private final TreatmentSubGroupRepository subGroupRepository;

    public TreatmentGroup findGroupById(UUID id)
    {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment Group", id));
    }

    public TreatmentGroupResponse findById(UUID id)
    {
        return mapper.toResponse(findGroupById(id));
    }

    public PageResponse<TreatmentGroupResponse> findAll(Pageable pageable)
    {
        Page<TreatmentGroupResponse> page = repository.findAll(pageable)
                .map(mapper::toResponse);

        return paginationMapper.toResponse(page);

    }

    @Transactional
    public TreatmentGroupResponse create(TreatmentGroupRequest request)
    {
        TreatmentGroup newTreatment = mapper.toEntity(request);

        return mapper.toResponse(repository.save(newTreatment));
    }

    @Transactional
    public TreatmentGroupResponse patch(TreatmentGroupRequest request, UUID id)
    {
        TreatmentGroup current = findGroupById(id);

        if (request.name() != null)
        {
            current.setName(request.name());
        }

        return mapper.toResponse(repository.save(current));
    }

    @Transactional
    public void delete(UUID id)
    {

        boolean hasDependency = (subGroupRepository.existsByGroupId(id));

        if (hasDependency) throw new DependentResourcesException("Group", "Sub-group");

        TreatmentGroup target = findGroupById(id);

        repository.delete(target);

    }
}
