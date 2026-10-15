
package dev.luann.backend.modules.email;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.luann.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    @Value("${resend.api-url}")
    private String apiUrl;

    @Value("${resend.api-key}")
    private String apiKey;

    @Value("${app.mail.from}")
    private String from;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Override
    public void sendPasswordResetEmail(String email, String token) {
        String link = frontendUrl + "/reset-password?token=" + token;

        Map<String, Object> payload = Map.of(
                "from", from,
                "to", List.of(email),
                "subject", "Redefinição de senha - Quibenne Panel",
                "html", """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Redefinição de senha</h2>
                    <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
                    <p>Para escolher uma nova senha, clique no botão abaixo:</p>
                    <p>
                        <a href="%s"
                           style="display: inline-block; padding: 12px 20px;
                                  background-color: #2563eb; color: #ffffff;
                                  text-decoration: none; border-radius: 6px;">
                            Redefinir senha
                        </a>
                    </p>
                    <p>Este link expira em 15 minutos.</p>
                    <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
                </div>
                """.formatted(link)
        );

        try {
            String requestBody = objectMapper.writeValueAsString(payload);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = httpClient.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );

            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new IllegalStateException(
                        "Falha ao enviar e-mail pelo Resend. HTTP status: "
                                + response.statusCode()
                );
            }
        } catch (JsonProcessingException e) {
            throw new IllegalStateException(
                    "Falha ao preparar o e-mail de recuperação de senha.", e
            );
        } catch (IOException e) {
            throw new IllegalStateException(
                    "Não foi possível conectar ao serviço de e-mail.", e
            );
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException(
                    "O envio do e-mail foi interrompido.", e
            );
        }
    }

    @Override
    public void sendPasswordResetEmail(User user, String token) {
        sendPasswordResetEmail(user.getEmail(), token);
    }
}
