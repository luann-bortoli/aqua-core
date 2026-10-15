package dev.luann.backend.modules.user;

import dev.luann.backend.modules.passwordReset.PasswordResetRepository;
import dev.luann.backend.modules.user.dto.UserPatchRequest;
import dev.luann.backend.modules.user.dto.UserRequest;
import dev.luann.backend.modules.user.dto.UserResponse;
import dev.luann.backend.shared.exception.EmailAlreadyExistsException;
import dev.luann.backend.shared.exception.ResourceNotFoundException;
import dev.luann.backend.shared.pagination.PaginationMapper;
import dev.luann.backend.shared.pagination.dto.PageResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService
{

    private final UserRepository repository;
    private final UserMapper mapper;
    private final PaginationMapper paginationMapper;
    private final PasswordEncoder encoder;
    private final PasswordResetRepository passwordResetRepository;

    private User findUserById(UUID id){

        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));

    }

    private String normalizeEmail(String email){
        return email.trim().toLowerCase();
    }

    public UserResponse findById(UUID id){

        return mapper.toResponse(findUserById(id));

    }

    public PageResponse<UserResponse> findAll(Pageable pageable) {

        Page<UserResponse> page = repository.findAll(pageable)
                .map(mapper::toResponse);

        return paginationMapper.toResponse(page);
    }

    @Transactional
    public UserResponse create(UserRequest request){

        String targetEmail = normalizeEmail(request.email());

        if (repository.existsByEmail(targetEmail))
        {
            throw new EmailAlreadyExistsException("User", targetEmail);
        }

        return mapper.toResponse(repository.save(mapper.toEntity(request)));

    }

    @Transactional
    public UserResponse patch(UUID id, UserPatchRequest request){

        User current = findUserById(id);

        if (request.name() != null)
        {
            current.setName(request.name());
        }

        if (request.role() != null) {
            current.setRole(request.role());
        }

        return  mapper.toResponse(repository.save(current));

    }

    @Transactional
    public void delete(UUID id){

        User target = findUserById(id);

        passwordResetRepository.deleteByUser(target);
        repository.delete(target);

    }

}
