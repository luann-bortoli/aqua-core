package dev.luann.backend.modules.product;

import dev.luann.backend.shared.entity.BaseEntity;
import dev.luann.backend.shared.entity.enums.ContentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "products")
public class Product extends BaseEntity
{
    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContentStatus status;

    @Column(nullable = false)
    private String image;
}
