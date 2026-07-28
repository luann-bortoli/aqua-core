package dev.luann.backend.modules.email;

import dev.luann.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    @Override
    public void sendPasswordResetEmail(String email, String token) {

        String link = "http://localhost:3000/reset-password?token=" + token;

        System.out.println("==================================");
        System.out.println("Enviando e-mail para: " + email);
        System.out.println("Link:");
        System.out.println(link);
        System.out.println("==================================");

    }

    @Override
    public void sendPasswordResetEmail(User user, String token)
    {

    }
}
