package dev.luann.backend.config;

import dev.luann.backend.modules.user.User;
import dev.luann.backend.modules.user.UserRepository;
import dev.luann.backend.modules.user.enums.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BootstrapAdmin implements CommandLineRunner
{
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.bootstrap-admin.email}")
    private String adminEmail;

    @Value("${app.bootstrap-admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args)
    {

        System.out.println("BOOTSTRAP EXECUTADO");

        if (repository.findByEmail(adminEmail).isPresent())
        {
            return;
        }

        User admin = new User();

        admin.setName("Administrator");
        admin.setEmail(adminEmail.trim().toLowerCase());
        admin.setRole(UserRole.ROLE_ADMIN);
        admin.setPassword(
                passwordEncoder.encode(adminPassword)
        );

        repository.save(admin);
    }
}