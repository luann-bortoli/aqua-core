package dev.luann.backend.shared.exception;

import lombok.Getter;

@Getter
public class EmailAlreadyExistsException extends RuntimeException
{
    private String resource;
    private String email;

    public EmailAlreadyExistsException(String resource, String email)
    {
        super(resource + " with email: " + email + " already exists.");

        this.resource = resource;
        this.email = email;
    }
}
