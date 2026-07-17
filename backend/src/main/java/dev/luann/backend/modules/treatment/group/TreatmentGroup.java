package dev.luann.backend.modules.treatment.group;

import dev.luann.backend.modules.treatment.subgroup.TreatmentSubGroup;
import dev.luann.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "treatment_groups")
public class TreatmentGroup extends BaseEntity
{
    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "group")
    private List<TreatmentSubGroup> subGroups = new ArrayList<>();
}
