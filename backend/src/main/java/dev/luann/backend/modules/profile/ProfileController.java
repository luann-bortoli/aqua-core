package dev.luann.backend.modules.profile;

import dev.luann.backend.modules.profile.dto.ProfileRequest;
import dev.luann.backend.modules.profile.dto.ProfileResponse;
import dev.luann.backend.modules.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/profile")
public class ProfileController
{
    private final ProfileService service;

    @PatchMapping
    public ResponseEntity<ProfileResponse> patch(
            @Valid @RequestBody ProfileRequest request,
            Authentication authentication
            )
    {
        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(service.update(request, user));
    }
}
