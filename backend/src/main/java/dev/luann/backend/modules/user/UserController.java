package dev.luann.backend.modules.user;

import dev.luann.backend.modules.user.dto.UserPatchRequest;
import dev.luann.backend.modules.user.dto.UserRequest;
import dev.luann.backend.modules.user.dto.UserResponse;
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
@RequestMapping("/users")
public class UserController
{

    private final UserService service;

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable UUID id){

        return ResponseEntity.ok(service.findById(id));

    }

    @GetMapping
    public ResponseEntity<PageResponse<UserResponse>> findAll(
            @PageableDefault(sort = "name") Pageable pageable
            ){
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<UserResponse> create(@Valid @RequestBody UserRequest request){

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));

    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponse> patch(
            @Valid @RequestBody UserPatchRequest request,
            @PathVariable UUID id){

        return ResponseEntity.ok(service.patch(id, request));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){

        service.delete(id);

        return ResponseEntity.noContent().build();

    }

}
