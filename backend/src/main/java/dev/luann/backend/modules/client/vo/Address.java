package dev.luann.backend.modules.client.vo;

import dev.luann.backend.modules.client.enums.State;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Embeddable
public class Address
{

    @Column(nullable = false, length = 2)
    @Enumerated(EnumType.STRING)
    private State state;

    @Column(nullable = false, length = 120)
    private String city;

}
