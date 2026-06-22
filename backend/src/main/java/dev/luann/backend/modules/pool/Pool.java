package dev.luann.backend.modules.pool;

import dev.luann.backend.shared.entity.BaseEntity;
import dev.luann.backend.shared.entity.enums.ContentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "pools")
public class Pool extends BaseEntity
{
    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContentStatus status;

    @Column(nullable = false)
    private String image;
}
