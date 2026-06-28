package dev.luann.backend.shared.exception.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint
{
    private final ObjectMapper objectMapper;

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException ex
    ) throws IOException
    {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);

        if (ex instanceof BadCredentialsException)
        {
            problem.setTitle("Invalid credentials");
            problem.setDetail(ex.getMessage());
            problem.setProperty("errorCode", "AUTH_BAD_CREDENTIALS");
        }
        else
        {
            problem.setTitle("Authentication failed");
            problem.setDetail(ex.getMessage());
            problem.setProperty("errorCode", "AUTH_FAILED");
        }

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/problem+json");

        objectMapper.writeValue(response.getOutputStream(), problem);
    }
}