export type ErrorCode =
    | "AUTH_BAD_CREDENTIALS"
    | "AUTH_FAILED"
    | "ACCESS_DENIED"
    | "METHOD_ARGUMENT_INVALID"
    | "EMAIL_ALREADY_EXISTS"
    | "RESOURCE_NOT_FOUND";

export interface ApiError {
    status: number;
    title: string;
    detail: string;
    errorCode: ErrorCode;
}