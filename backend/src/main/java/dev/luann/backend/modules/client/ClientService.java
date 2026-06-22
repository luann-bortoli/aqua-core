package dev.luann.backend.modules.client;

import dev.luann.backend.modules.client.dto.ClientPatchRequest;
import dev.luann.backend.modules.client.dto.ClientRequest;
import dev.luann.backend.modules.client.dto.ClientResponse;
import dev.luann.backend.shared.exception.EmailAlreadyExistsException;
import dev.luann.backend.shared.exception.ResourceNotFoundException;
import dev.luann.backend.shared.pagination.dto.PageResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ClientService
{

    private final ClientRepository repository;
    private final ClientMapper mapper;

    private Client findClientById(UUID id)
    {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client", id));
    }

    private String normalizeEmail(String email)
    {
        return email.trim().toLowerCase();
    }

    public PageResponse<ClientResponse> findAll(Pageable pageable)
    {
        Page<ClientResponse> page = repository.findAll(pageable)
                .map(mapper::toResponse);

        return new PageResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );
    }

    public ClientResponse findById(UUID id)
    {
        return mapper.toResponse(findClientById(id));
    }

    @Transactional
    public ClientResponse create(ClientRequest request)
    {

        String targetEmail = normalizeEmail(request.email());

        if (repository.existsByEmail(targetEmail))
        {
            throw new EmailAlreadyExistsException("Client", request.email());
        }

        Client client = mapper.toEntity(request);

        return mapper.toResponse(repository.save(client));
    }

    @Transactional
    public ClientResponse patch(UUID id, ClientPatchRequest request)
    {
        Client current = findClientById(id);

        if (request.email() != null)
        {
            String targetEmail = normalizeEmail(request.email());
            String currentEmail = normalizeEmail(current.getEmail());

            if (
                    !currentEmail.equalsIgnoreCase(targetEmail) &&
                            repository.existsByEmail(targetEmail)
            )
            {
                throw new EmailAlreadyExistsException("Client", targetEmail);
            }

            current.setEmail(targetEmail);
        }

        if (request.name() != null)
        {
            current.setName(request.name());
        }

        if (request.address() != null)
        {
            current.setAddress(request.address());
        }

        if(request.phone() != null)
        {
            current.setPhone(request.phone());
        }

        return mapper.toResponse(repository.save(current));
    }

    @Transactional
    public void delete(UUID id)
    {
        Client target = findClientById(id);

        repository.delete(target);
    }


}
