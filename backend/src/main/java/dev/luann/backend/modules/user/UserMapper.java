package dev.luann.backend.modules.user;

import dev.luann.backend.modules.user.dto.UserRequest;
import dev.luann.backend.modules.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class UserMapper
{

    private final PasswordEncoder encoder;

    public UserResponse toResponse(User user){

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getRole(),
                user.getEmail()
        );

    }

    public User toEntity(UserRequest request){

        User user = new User();

        user.setName(request.name());
        user.setRole(request.role());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPassword(encoder.encode(request.password()));

        return user;

    }

}
