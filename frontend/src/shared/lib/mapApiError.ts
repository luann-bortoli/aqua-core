import { ErrorCode } from "../types/error"

export function mapApiError(error: any): string {

    const errorId: ErrorCode | number = error.Code ?? error.status

    switch (errorId)
    {
        case "AUTH_BAD_CREDENTIALS":
            return "Email ou senha inválidos."

        case "METHOD_ARGUMENT_INVALID":
            return "Argumentos inválidos."

        case "EMAIL_ALREADY_EXISTS":
            return "Email já cadastrado."

        case "RESOURCE_NOT_FOUND":
            return "Recurso não encontrado."

        case "ACCESS_DENIED":
        case 403:
            return "Você não possui as permissões necessárias."

        case "AUTH_FAILED":
        case 401:
            return "Autenticação falhou."

        case "UNSUPPORTED_MEDIA_TYPE":
            return "Arquivo não suportado."

        case "NO_CHANGES":
            return "Nenhuma alteração foi informada."

        case "INVALID_PASSWORD":
            return "Senha inválida."

        case "DEPENDENT_RESOURCES":
            return "Não é possível excluir este recurso porque existem registros vinculados a ele."

        default:
            return "Erro inesperado."
    }

}