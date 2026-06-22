package dev.luann.backend.modules.user;

import dev.luann.backend.modules.user.dto.UserRequest;
import dev.luann.backend.modules.user.dto.UserResponse;
import org.springframework.stereotype.Component;

@Component
public class UserMapper
{

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
        user.setPassword(request.password());

        return user;

    }

}
