package dev.luann.backend.modules.profile;

import dev.luann.backend.modules.profile.dto.ProfileRequest;
import dev.luann.backend.modules.profile.dto.ProfileResponse;
import dev.luann.backend.modules.user.User;
import dev.luann.backend.modules.user.UserRepository;
import dev.luann.backend.shared.exception.InvalidPasswordException;
import dev.luann.backend.shared.exception.NoChangesException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProfileService
{

    private final UserRepository repository;
    private final ProfileMapper mapper;
    private final BCryptPasswordEncoder encoder;

    private boolean hasValue(String value)
    {
        return (value != null && !value.isBlank());
    }

    @Transactional
    public ProfileResponse update(ProfileRequest request, User target)
    {
        boolean hasNewName = hasValue(request.newName());
        boolean hasNewPassword = hasValue(request.newPassword());

        if (!hasNewName && !hasNewPassword) throw new NoChangesException();

        if (!encoder.matches(request.currentPassword(), target.getPassword()))
        {
            throw new InvalidPasswordException();
        }

        if (hasNewName) target.setName(request.newName());
        if (hasNewPassword) target.setPassword(
                encoder.encode(request.newPassword())
        );

        return mapper.toResponse(repository.save(target));
    }
}
