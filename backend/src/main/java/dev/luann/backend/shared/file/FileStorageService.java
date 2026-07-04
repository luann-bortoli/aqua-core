package dev.luann.backend.shared.file;

import dev.luann.backend.shared.exception.FileStorageException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path uploadDir = Paths.get("uploads");

    public String save(MultipartFile file) {

        try {

            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            String extension = "";

            String original = file.getOriginalFilename();

            if (original != null && original.contains(".")) {
                extension = original.substring(original.lastIndexOf('.'));
            }

            String filename = UUID.randomUUID() + extension;

            Path target = uploadDir.resolve(filename);

            Files.copy(file.getInputStream(), target);

            return "uploads/" + filename;

        } catch (IOException e) {
            throw new FileStorageException("Erro ao salvar arquivo.");
        }
    }
}
