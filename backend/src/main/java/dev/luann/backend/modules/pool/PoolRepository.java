package dev.luann.backend.modules.pool;

import dev.luann.backend.shared.enums.ContentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PoolRepository extends JpaRepository<Pool, UUID>
{
    List<Pool> findAllByStatus(ContentStatus status);
}
