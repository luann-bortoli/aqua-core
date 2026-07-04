package dev.luann.backend.modules.pool;

import dev.luann.backend.modules.pool.dto.PoolRequest;
import dev.luann.backend.modules.pool.dto.PoolResponse;
import dev.luann.backend.shared.pagination.dto.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/pools")
public class PoolController {

    private final PoolService service;

    @GetMapping("/{id}")
    public ResponseEntity<PoolResponse> findById(@PathVariable UUID id)
    {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<PageResponse<PoolResponse>> findAll(
            @PageableDefault(sort = "updatedAt")Pageable pageable
            ){
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<PoolResponse> create(
            @Valid @RequestBody PoolRequest request
            ){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PoolResponse> patch(
            @Valid @RequestBody PoolRequest request,
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
