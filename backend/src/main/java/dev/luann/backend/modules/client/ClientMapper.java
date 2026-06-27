package dev.luann.backend.modules.client;

import dev.luann.backend.modules.client.dto.ClientRequest;
import dev.luann.backend.modules.client.dto.ClientResponse;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper
{

    public ClientResponse toResponse(Client client)
    {
        return new ClientResponse(
                client.getId(),
                client.getName(),
                client.getEmail(),
                client.getAddress(),
                client.getPhone()
        );
    }

    public Client toEntity(ClientRequest request)
    {
        Client client = new Client();

        client.setName(request.name());
        client.setEmail(request.email());
        client.setAddress(request.address());
        client.setPassword(request.phone());

        return client;
    }

}
