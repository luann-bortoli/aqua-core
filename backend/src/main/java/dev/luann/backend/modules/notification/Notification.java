package dev.luann.backend.modules.notification;

import dev.luann.backend.shared.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "notifications")
public class Notification extends BaseEntity
{
    @Column(nullable = false)
    String title;

    @Column(nullable = false)
    String description;
}
