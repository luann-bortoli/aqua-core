package dev.luann.backend.modules.profile;

import dev.luann.backend.modules.profile.dto.ProfileResponse;
import dev.luann.backend.modules.user.User;

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
