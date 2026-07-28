package dev.luann.backend.modules.passwordReset;

import dev.luann.backend.modules.email.EmailServiceImpl;
import dev.luann.backend.modules.user.User;
import dev.luann.backend.modules.user.UserRepository;
import dev.luann.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService
{

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final EmailServiceImpl emailService;

    private final PasswordResetRepository repository;

    void forgotPassword(String email){

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) return;

        User target = optionalUser.get();

        SecureRandom random = new SecureRandom();

        byte[] bytes = new byte[32];

        random.nextBytes(bytes);

        String token = Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);

        String tokenHash = encoder.encode(token);

        PasswordResetToken newToken = new PasswordResetToken(
                UUID.randomUUID(),
                tokenHash,
                LocalDateTime.now().plusMinutes(15),
                target
        );

        repository.deleteByUser(target);

        repository.save(newToken);

        emailService.sendPasswordResetEmail(
                email,
                token
        );

    }

    void resetPassword(String token, String newPassword){}

}
