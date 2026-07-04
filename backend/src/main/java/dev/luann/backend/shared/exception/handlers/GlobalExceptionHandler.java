package dev.luann.backend.shared.exception.handlers;

import dev.luann.backend.shared.exception.EmailAlreadyExistsException;
import dev.luann.backend.shared.exception.FileStorageException;
import dev.luann.backend.shared.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler
{

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleResourceNotFound(ResourceNotFoundException ex)
    {
        ProblemDetail problem =
                ProblemDetail.forStatus(HttpStatus.NOT_FOUND);

        problem.setTitle("Resource not found");
        problem.setDetail(ex.getMessage());
        problem.setProperty("errorCode", "RESOURCE_NOT_FOUND");
        problem.setProperty("resource", ex.getResource());
        problem.setProperty("identifier", ex.getIdentifier());

        return problem;

    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ProblemDetail handleEmailAlreadyExists(EmailAlreadyExistsException ex)
    {
        ProblemDetail problem =
                ProblemDetail.forStatus(HttpStatus.CONFLICT);

        problem.setTitle("Email already exists");
        problem.setDetail(ex.getMessage());
        problem.setProperty("errorCode", "EMAIL_ALREADY_EXISTS");
        problem.setProperty("resource", ex.getResource());
        problem.setProperty("email", ex.getEmail());

        return  problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleMethodArgumentNotValid(MethodArgumentNotValidException ex)
    {
        ProblemDetail problem =
                ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);

        problem.setTitle("Method argument invalid");
        problem.setDetail(ex.getMessage());
        problem.setProperty("errorCode", "METHOD_ARGUMENT_INVALID");

        return problem;
    }

    @ExceptionHandler(FileStorageException.class)
    public ProblemDetail handleFileStorageException(FileStorageException ex)
    {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);

        problem.setTitle("File storage error");
        problem.setDetail(ex.getMessage());
        problem.setProperty("errorCode", "FILE_STORAGE_ERROR");

        return problem;
    }
}
