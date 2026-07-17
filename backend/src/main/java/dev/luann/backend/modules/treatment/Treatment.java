package dev.luann.backend.modules.treatment;

import dev.luann.backend.modules.product.Product;
import dev.luann.backend.modules.treatment.subgroup.TreatmentSubGroup;
import dev.luann.backend.shared.entity.BaseEntity;
import dev.luann.backend.shared.enums.ContentStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "treatments")
public class Treatment extends BaseEntity
{
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String summary;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ContentStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_group_id")
    private TreatmentSubGroup subGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(columnDefinition = "json")
    private String content;
}
