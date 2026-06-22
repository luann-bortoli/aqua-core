package dev.luann.backend.modules.client.dto;

import dev.luann.backend.modules.client.vo.Address;

public record ClientPatchRequest(

        String name,

        String email,

        Address address,

        String phone

){}
