package dev.luann.backend.modules.treatment.group;

import dev.luann.backend.modules.treatment.group.dto.TreatmentGroupRequest;
import dev.luann.backend.modules.treatment.group.dto.TreatmentGroupResponse;
import dev.luann.backend.shared.exception.ResourceNotFoundException;
import dev.luann.backend.shared.pagination.PaginationMapper;
import dev.luann.backend.shared.pagination.dto.PageResponse;
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

    private TreatmentGroup findGroupById(UUID id)
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

    public TreatmentGroupResponse create(TreatmentGroupRequest request)
    {
        TreatmentGroup newTreatment = mapper.toEntity(request);

        return mapper.toResponse(repository.save(newTreatment));
    }

    public TreatmentGroupResponse patch(TreatmentGroupRequest request, UUID id)
    {
        TreatmentGroup current = findGroupById(id);

        if (request.name() != null)
        {
            current.setName(request.name());
        }

        return mapper.toResponse(repository.save(current));
    }

    public void delete(UUID id)
    {
        TreatmentGroup target = findGroupById(id);

        repository.delete(target);

    }
}
