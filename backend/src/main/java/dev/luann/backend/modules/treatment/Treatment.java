package dev.luann.backend.modules.treatment;

import dev.luann.backend.modules.product.Product;
import dev.luann.backend.modules.treatment.dto.TreatmentContent;
import dev.luann.backend.modules.treatment.subgroup.TreatmentSubGroup;
import dev.luann.backend.shared.entity.BaseEntity;
import dev.luann.backend.shared.enums.ContentStatus;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


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

    @Valid
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private TreatmentContent content;
}
