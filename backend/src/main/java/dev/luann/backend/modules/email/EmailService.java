package dev.luann.backend.modules.email;

import dev.luann.backend.modules.user.User;

public interface EmailService {

    void sendPasswordResetEmail(String email, String token);

    void sendPasswordResetEmail(User user, String token);

}
