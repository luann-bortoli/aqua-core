package dev.luann.backend.modules.passwordReset;

import dev.luann.backend.modules.auth.utils.HashUtils;
import dev.luann.backend.modules.email.EmailService;
import dev.luann.backend.modules.email.EmailServiceImpl;
import dev.luann.backend.modules.passwordReset.exception.InvalidTokenException;
import dev.luann.backend.modules.passwordReset.exception.enums.InvalidTokenReason;
import dev.luann.backend.modules.user.User;
import dev.luann.backend.modules.user.UserRepository;
import dev.luann.backend.shared.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetRepository repository;

    @Transactional
    public void forgotPassword(String email){

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) return;

        User target = optionalUser.get();

        SecureRandom random = new SecureRandom();

        byte[] bytes = new byte[32];

        random.nextBytes(bytes);

        String token = Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);

        String tokenHash = HashUtils.sha256(token);

        PasswordResetToken newToken = new PasswordResetToken(
                null,
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

    @Transactional
    public void resetPassword(String token, String newPassword){

        String tokenHash = HashUtils.sha256(token);

        PasswordResetToken resetToken = repository
                .findByTokenHash(tokenHash)
                .orElseThrow(() -> new ResourceNotFoundException("ResetToken", "providedToken"));

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new InvalidTokenException(InvalidTokenReason.expired);
        }

        User target = resetToken.getUser();

        target.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(target);

        repository.delete(resetToken);
    }

}
