package dev.luann.backend.modules.treatment.subgroup;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TreatmentSubGroupRepository extends JpaRepository<TreatmentSubGroup, UUID>
{
    Page<TreatmentSubGroup> findByGroupId(
            UUID groupId,
            Pageable pageable
    );

    boolean existsByGroupId(UUID groupId);
}
