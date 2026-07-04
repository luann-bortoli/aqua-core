package dev.luann.backend.modules.product;

import dev.luann.backend.modules.product.dto.ProductPatchRequest;
import dev.luann.backend.modules.product.dto.ProductRequest;
import dev.luann.backend.modules.product.dto.ProductResponse;
import dev.luann.backend.shared.exception.ResourceNotFoundException;
import dev.luann.backend.shared.file.FileStorageService;
import dev.luann.backend.shared.pagination.PaginationMapper;
import dev.luann.backend.shared.pagination.dto.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository repository;
    private final ProductMapper mapper;
    private final PaginationMapper paginationMapper;
    private final FileStorageService fileStorageService;

    private Product findProductById(UUID id)
    {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
    }

    public PageResponse<ProductResponse> findAll(Pageable pageable)
    {
        Page<ProductResponse> page = repository.findAll(pageable)
                .map(mapper::toResponse);

        return paginationMapper.toResponse(page);
    }

    public ProductResponse findById(UUID id)
    {
        return mapper.toResponse(findProductById(id));
    }

    public ProductResponse create(ProductRequest request)
    {
        String imagePath = fileStorageService.save(request.image());

        Product product = mapper.toEntity(request);
        product.setImage(imagePath);

        return mapper.toResponse(repository.save(product));
    }

    public ProductResponse patch(UUID id, ProductPatchRequest request)
    {
        Product current = findProductById(id);

        if (request.image() != null)
        {
            String imagePath = fileStorageService.save(request.image());
            current.setImage(imagePath);
        }

        if (request.title() != null) current.setTitle(request.title());

        if (request.status() != null) current.setStatus(request.status());

        return mapper.toResponse(repository.save(current));
    }

    public void delete(UUID id)
    {
        Product target = findProductById(id);

        repository.delete(target);
    }

}
