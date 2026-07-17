package dev.luann.backend.shared.exception;

public class InvalidPasswordException extends RuntimeException
{
    public InvalidPasswordException()
    {
        super("Invalid password");
    }
}
