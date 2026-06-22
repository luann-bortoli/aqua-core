package dev.luann.backend.modules.client.dto;

import dev.luann.backend.modules.client.vo.Address;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ClientRequest(

        @NotBlank
        String name,

        @NotBlank
        @Email
        String email,

        @NotNull
        Address address,

        @NotBlank
        @Size(min = 10, max = 20)
        String phone,

        @NotBlank
        String password

){}
