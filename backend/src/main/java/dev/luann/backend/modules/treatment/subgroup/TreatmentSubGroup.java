package dev.luann.backend.modules.treatment.subgroup;

import dev.luann.backend.modules.treatment.Treatment;
import dev.luann.backend.modules.treatment.group.TreatmentGroup;
import dev.luann.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "treatment_sub_groups")
public class TreatmentSubGroup extends BaseEntity
{
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private TreatmentGroup group;

    @OneToMany(mappedBy = "subGroup")
    private List<Treatment> treatments = new ArrayList<>();
}
