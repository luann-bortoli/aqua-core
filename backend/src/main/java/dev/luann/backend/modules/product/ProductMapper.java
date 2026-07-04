package dev.luann.backend.modules.product;

import dev.luann.backend.modules.product.dto.ProductRequest;
import dev.luann.backend.modules.product.dto.ProductResponse;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductResponse toResponse(Product product)
    {
        return new ProductResponse(
                product.getId(),
                product.getTitle(),
                product.getStatus(),
                product.getImage()
        );
    }

    public Product toEntity(ProductRequest request)
    {
        Product product = new Product();

        product.setTitle(request.title());
        product.setStatus(request.status());

        return product;
    }

}
