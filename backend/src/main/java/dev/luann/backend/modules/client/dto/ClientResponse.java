package dev.luann.backend.modules.client.dto;

import dev.luann.backend.modules.client.vo.Address;

import java.util.UUID;

public record ClientResponse(

        UUID id,

        String name,

        String email,

        Address address,

        String phone

){}
