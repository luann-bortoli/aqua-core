import { z } from 'zod'

export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "Senha muito curta."),

    repeatedPassword: z
        .string()
        .min(8, "Senha muito curta.")
}).refine(
    data => data.password === data.repeatedPassword,
    {
        message: "As senhas não coincidem.",
        path: ["repeatedPassword"]
    }
)

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>