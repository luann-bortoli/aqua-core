package dev.luann.backend.modules.notification;

import dev.luann.backend.modules.notification.dto.NotificationResponse;
import dev.luann.backend.shared.pagination.dto.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class NotificationService
{

    private final NotificationRepository repository;
    private final NotificationMapper mapper;

    public PageResponse<NotificationResponse> findAll(Pageable pageable)
    {
        Page<NotificationResponse> page = repository.findAll(pageable)
                .map(mapper::toResponse);

        return new PageResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );
    }

}
