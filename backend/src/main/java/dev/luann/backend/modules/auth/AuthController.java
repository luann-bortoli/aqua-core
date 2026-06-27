package dev.luann.backend.modules.auth;

import dev.luann.backend.modules.auth.dto.LoginRequest;
import dev.luann.backend.modules.auth.dto.LoginResponse;
import dev.luann.backend.modules.auth.dto.LogoutResponse;
import dev.luann.backend.modules.user.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController
{
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest servletRequest
    )
    {
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.email().trim().toLowerCase(),
                                request.password()
                        )
                );

        SecurityContext context =
                SecurityContextHolder.createEmptyContext();

        context.setAuthentication(authentication);

        SecurityContextHolder.setContext(context);

        HttpSession session =
                servletRequest.getSession(true);

        session.setAttribute(
                HttpSessionSecurityContextRepository
                        .SPRING_SECURITY_CONTEXT_KEY,
                context
        );

        User user = (User) authentication.getPrincipal();

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                "Login successful"
        );
    }

    @PostMapping("/logout")
    public LogoutResponse logout(HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);

        if (session != null)
        {
            session.invalidate();
        }

        SecurityContextHolder.clearContext();

        return new LogoutResponse(
                "Logout successful"
        );
    }

    @GetMapping("/me")
    public LoginResponse me(Authentication authentication)
    {
        User user = (User) authentication.getPrincipal();

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                "Authenticated"
        );
    }
}