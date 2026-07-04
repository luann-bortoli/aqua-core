package dev.luann.backend.modules.pool;

import dev.luann.backend.modules.pool.dto.PoolRequest;
import dev.luann.backend.modules.pool.dto.PoolResponse;
import org.springframework.stereotype.Component;

@Component
public class PoolMapper
{
    public PoolResponse toResponse(Pool pool)
    {
        return new PoolResponse(
                pool.getId(),
                pool.getTitle(),
                pool.getStatus(),
                pool.getImage()
        );
    }

    public Pool toEntity (PoolRequest request)
    {
        Pool pool = new Pool();

        pool.setTitle(request.title());
        pool.setStatus(request.status());

        return pool;
    }
}
