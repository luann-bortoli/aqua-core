package dev.luann.backend.modules.treatment.group;

import dev.luann.backend.modules.treatment.group.dto.TreatmentGroupRequest;
import dev.luann.backend.modules.treatment.group.dto.TreatmentGroupResponse;
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
@RequestMapping("/treatment-groups")
public class TreatmentGroupController
{

    private final TreatmentGroupService service;

    @GetMapping("/{id}")
    public ResponseEntity<TreatmentGroupResponse> findById(
            @PathVariable UUID id)
    {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<PageResponse<TreatmentGroupResponse>> findAll(
            @PageableDefault(sort = "updatedAt", direction = Sort.Direction.DESC) Pageable pageable
            ){
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @Transactional
    @PostMapping
    public ResponseEntity<TreatmentGroupResponse> create(
            @Valid @RequestBody TreatmentGroupRequest request)
    {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @Transactional
    @PatchMapping("/{id}")
    public ResponseEntity<TreatmentGroupResponse> patch(
            @Valid @RequestBody TreatmentGroupRequest request,
            @PathVariable UUID id
    ){
        return ResponseEntity.ok(service.patch(request, id));
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id)
    {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
