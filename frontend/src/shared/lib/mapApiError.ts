export function mapApiError(error: any): string {

    switch (error.errorCode ?? error.status)
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
            return "Você não possui as permissões necessárias."

        case "AUTH_FAILED":
            return "Autenticação falhou."

        case "UNSUPPORTED_MEDIA_TYPE":
            return "Arquivo não suportado."

        case 400:
            return "Solicitação inválida."

        default:
            return "Erro inesperado."
    }

}