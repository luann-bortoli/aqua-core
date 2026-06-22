package dev.luann.backend.modules.notification;

import dev.luann.backend.modules.notification.dto.NotificationPatchRequest;
import dev.luann.backend.modules.notification.dto.NotificationRequest;
import dev.luann.backend.modules.notification.dto.NotificationResponse;
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
public class NotificationService
{

    private final NotificationRepository repository;
    private final NotificationMapper mapper;
    private final PaginationMapper paginationMapper;

    private Notification findNotificationById(UUID id)
    {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", id));
    }

    public PageResponse<NotificationResponse> findAll(Pageable pageable)
    {
        Page<NotificationResponse> page = repository.findAll(pageable)
                .map(mapper::toResponse);

        return paginationMapper.toResponse(page);
    }

    public NotificationResponse findById(UUID id)
    {
        return mapper.toResponse(findNotificationById(id));
    }

    public NotificationResponse create(NotificationRequest request)
    {
        Notification notification = mapper.toEntity(request);

        return mapper.toResponse(repository.save(notification));
    }

    public NotificationResponse patch(NotificationPatchRequest request, UUID id)
    {
        Notification current = findNotificationById(id);

        if (request.title() != null)
        {
            current.setTitle(request.title());
        }

        if (request.description() != null)
        {
            current.setDescription(request.description());
        }

        return mapper.toResponse(repository.save(current));
    }

    public void delete(UUID id)
    {
        Notification target = findNotificationById(id);

        repository.delete(target);
    }

}
