package dev.luann.backend.modules.client;

import dev.luann.backend.modules.client.dto.ClientPatchRequest;
import dev.luann.backend.modules.client.dto.ClientRequest;
import dev.luann.backend.modules.client.dto.ClientResponse;
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
@RequestMapping("/clients")
public class ClientController
{
    private final ClientService service;

    @GetMapping("/{id}")
    public ResponseEntity<ClientResponse> findById(@PathVariable UUID id)
    {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<PageResponse<ClientResponse>> findAll(
            @PageableDefault(sort = "updatedAt")Pageable pageable
            ){
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<ClientResponse> create(
            @Valid @RequestBody ClientRequest request
            )
    {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ClientResponse> patch(
            @Valid @RequestBody ClientPatchRequest request,
            @PathVariable UUID id
            )
    {
        return ResponseEntity.ok(service.patch(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id
    )
    {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
