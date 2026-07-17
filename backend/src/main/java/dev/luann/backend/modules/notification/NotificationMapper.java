package dev.luann.backend.modules.notification;

import dev.luann.backend.modules.notification.dto.NotificationRequest;
import dev.luann.backend.modules.notification.dto.NotificationResponse;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper
{

    public NotificationResponse toResponse(Notification notification)
    {
        return new NotificationResponse(
                notification.getId(),
                notification.getTitle(),
                notification.getDescription()
        );
    }

    public Notification toEntity(NotificationRequest request)
    {
        Notification notification = new Notification();
        notification.setTitle(request.title());
        notification.setDescription(request.description());

        return notification;
    }

}
