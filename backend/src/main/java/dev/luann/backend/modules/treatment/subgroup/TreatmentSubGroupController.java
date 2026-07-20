package dev.luann.backend.modules.treatment.subgroup;

import dev.luann.backend.modules.treatment.subgroup.dto.TreatmentSubGroupPatchRequest;
import dev.luann.backend.modules.treatment.subgroup.dto.TreatmentSubGroupRequest;
import dev.luann.backend.modules.treatment.subgroup.dto.TreatmentSubGroupResponse;
import dev.luann.backend.shared.pagination.dto.PageResponse;
import jakarta.transaction.Transactional;
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
@RequestMapping("/treatment-sub-groups")
public class TreatmentSubGroupController
{

    private final TreatmentSubGroupService service;

    @GetMapping("/{id}")
    public ResponseEntity<TreatmentSubGroupResponse> findById(
            @PathVariable UUID id)
    {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<PageResponse<TreatmentSubGroupResponse>> findByGroup(
            @PageableDefault(sort = "updatedAt", direction = Sort.Direction.DESC)
            Pageable pageable,
            UUID id)
    {
        return ResponseEntity.ok(service.findByGroup(id, pageable));
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<PageResponse<TreatmentSubGroupResponse>> findByGroup(
            @PathVariable UUID groupId,
            @PageableDefault(sort = "updatedAt", direction = Sort.Direction.DESC)
            Pageable pageable)
    {
        return ResponseEntity.ok(service.findByGroup(groupId, pageable));
    }

    @PostMapping
    public ResponseEntity<TreatmentSubGroupResponse> create(
            @Valid @RequestBody TreatmentSubGroupRequest request)
    {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TreatmentSubGroupResponse> patch(
            @Valid @RequestBody TreatmentSubGroupPatchRequest request,
            @PathVariable UUID id)
    {
        return ResponseEntity.ok(service.patch(request, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id)
    {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}