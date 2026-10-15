package dev.luann.backend.modules.treatment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TreatmentRepository extends JpaRepository<Treatment, UUID> {

    Page<Treatment> findBySubGroupId(UUID subGroupId, Pageable pageable);

    boolean existsBySubGroupId(UUID subGroupId);
}
