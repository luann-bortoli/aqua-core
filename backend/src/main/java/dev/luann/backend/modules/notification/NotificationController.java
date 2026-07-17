package dev.luann.backend.modules.notification;

import dev.luann.backend.modules.notification.dto.NotificationPatchRequest;
import dev.luann.backend.modules.notification.dto.NotificationRequest;
import dev.luann.backend.modules.notification.dto.NotificationResponse;
import dev.luann.backend.shared.pagination.dto.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/notifications")
public class NotificationController
{
    private final NotificationService service;

    @GetMapping
    public ResponseEntity<PageResponse<NotificationResponse>> findAll(
            @PageableDefault(sort = "updatedAt", direction = Sort.Direction.DESC) Pageable pageable
            ){
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificationResponse> findById(@PathVariable UUID id)
    {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<NotificationResponse> create(
            @Valid @RequestBody NotificationRequest request
            ){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<NotificationResponse> patch(
            @Valid @RequestBody NotificationPatchRequest request,
            @PathVariable UUID id
            ){
        return ResponseEntity.ok(service.patch(request, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id
            ){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
