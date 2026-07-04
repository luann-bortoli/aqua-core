package dev.luann.backend.modules.pool;

import dev.luann.backend.modules.client.Client;
import dev.luann.backend.modules.pool.dto.PoolRequest;
import dev.luann.backend.modules.pool.dto.PoolResponse;
import dev.luann.backend.shared.exception.ResourceNotFoundException;
import dev.luann.backend.shared.file.FileStorageService;
import dev.luann.backend.shared.pagination.PaginationMapper;
import dev.luann.backend.shared.pagination.dto.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;


@RequiredArgsConstructor
@Service
public class PoolService
{
    private final PoolRepository repository;
    private final PoolMapper mapper;
    private final PaginationMapper paginationMapper;
    private final FileStorageService fileStorageService;

    private Pool findPoolById(UUID id)
    {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pool", id));
    }

    public PageResponse<PoolResponse> findAll(Pageable pageable)
    {
        Page<PoolResponse> page = repository.findAll(pageable)
            .map(mapper::toResponse);

        return paginationMapper.toResponse(page);
    }

    public PoolResponse findById(UUID id)
    {
        return mapper.toResponse(findPoolById(id));
    }

    public PoolResponse create(PoolRequest request)
    {
        String imagePath = fileStorageService.save(request.image());

        Pool pool = mapper.toEntity(request);
        pool.setImage(imagePath);

        return mapper.toResponse(repository.save(pool));
    }

    public PoolResponse patch(PoolRequest request, UUID id)
    {
        Pool target = findPoolById(id);

        if (request.image() != null)
        {
            String imagePath = fileStorageService.save(request.image());
            target.setImage(imagePath);
        }

        if (request.title() != null) target.setTitle(request.title());

        if (request.status() != null) target.setStatus(request.status());

        return mapper.toResponse(repository.save(target));
    }

    public void delete(UUID id)
    {
        Pool target = findPoolById(id);

        repository.delete(target);
    }

}
