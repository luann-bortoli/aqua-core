package dev.luann.backend.modules.product;

import dev.luann.backend.modules.product.dto.ProductPatchRequest;
import dev.luann.backend.modules.product.dto.ProductRequest;
import dev.luann.backend.modules.product.dto.ProductResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService service;

    public ResponseEntity<ProductResponse> findById(@PathVariable UUID id)
    {
        return ResponseEntity.ok(service.findById(id));
    }

    public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductRequest request)
    {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    public ResponseEntity<ProductResponse> patch(
            @Valid @RequestBody ProductPatchRequest request,
            @PathVariable UUID id
            ){
        return ResponseEntity.ok(service.patch(id, request));
    }

    public ResponseEntity<Void> delete(
            @PathVariable UUID id
    ){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
