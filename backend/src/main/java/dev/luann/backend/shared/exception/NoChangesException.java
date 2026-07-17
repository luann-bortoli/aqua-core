package dev.luann.backend.shared.exception;

import lombok.Getter;

@Getter
public class NoChangesException extends RuntimeException
{
    public NoChangesException()
    {
        super("No changes were provided.");
    }
}