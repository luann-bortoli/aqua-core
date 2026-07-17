package dev.luann.backend.modules.treatment.group;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TreatmentGroupRepository extends JpaRepository<TreatmentGroup, UUID>
{
}
