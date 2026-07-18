package dev.luann.backend.modules.profile;

import dev.luann.backend.modules.profile.dto.ProfileResponse;
import dev.luann.backend.modules.user.User;
import org.springframework.stereotype.Component;

@Component
public class ProfileMapper
{
    public ProfileResponse toResponse(User user)
    {
        return new ProfileResponse(
                user.getId(),
                user.getName()
        );
    }
}
