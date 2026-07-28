package dev.luann.backend.modules.passwordReset.exception;

import dev.luann.backend.modules.passwordReset.exception.enums.InvalidTokenReason;
import lombok.Getter;

@Getter
public class InvalidTokenException extends RuntimeException {

    private InvalidTokenReason reason;

    public InvalidTokenException(InvalidTokenReason reason) {

        super("Token is invalid because it is: " + reason);

        this.reason = reason;

    }

}
