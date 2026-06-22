package dev.luann.backend.shared.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
public class ResourceNotFoundException extends RuntimeException
{

    private final String resource;
    private final Object identifier;

    public ResourceNotFoundException(String resource, Object identifier)
    {
        super(resource + " with id: " + identifier + " not found.");

        this.resource = resource;
        this.identifier = identifier;

    }
}
