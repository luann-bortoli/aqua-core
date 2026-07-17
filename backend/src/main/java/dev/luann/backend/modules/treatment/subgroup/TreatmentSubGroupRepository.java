package dev.luann.backend.modules.treatment.subgroup;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TreatmentSubGroupRepository extends JpaRepository<TreatmentSubGroup, UUID>
{
}
