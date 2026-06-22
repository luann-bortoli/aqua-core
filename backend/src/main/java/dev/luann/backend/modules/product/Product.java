package dev.luann.backend.modules.product;

import dev.luann.backend.shared.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product extends BaseEntity
{

}
