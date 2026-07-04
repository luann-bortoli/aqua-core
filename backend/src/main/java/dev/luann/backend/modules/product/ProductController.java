package dev.luann.backend.modules.product;

import dev.luann.backend.modules.product.dto.ProductPatchRequest;
import dev.luann.backend.modules.product.dto.ProductRequest;
import dev.luann.backend.modules.product.dto.ProductResponse;
import dev.luann.backend.shared.pagination.dto.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService service;

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> findById(@PathVariable UUID id)
    {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<PageResponse<ProductResponse>> findAll(
            @PageableDefault(sort = "updatedAt", direction = Sort.Direction.DESC) Pageable pageable
            ) {
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> create(
            @ModelAttribute @Valid ProductRequest request
            )
    {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PatchMapping(value = "/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> patch(
            @ModelAttribute @Valid ProductPatchRequest request,
            @PathVariable UUID id
            ){
        return ResponseEntity.ok(service.patch(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id
    ){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
