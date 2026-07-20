package dev.luann.backend.shared.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
public class DependentResourcesException extends RuntimeException
{

    private String resource;
    private String dependency;

    public DependentResourcesException(String resource, String dependency)
    {
        super(resource + " cannot be deleted because it has " + dependency);

        this.resource = resource;
        this.dependency = dependency;
    }
}
