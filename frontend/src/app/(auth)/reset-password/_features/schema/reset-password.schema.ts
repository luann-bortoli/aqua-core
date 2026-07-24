import { z } from 'zod'

export const resetPasswordSchema = z.object({

    password: z
        .string()
        .trim()
        .min(8, "Senha muito curta."),

    repeatedPassword: z
        .string()
        .trim()
        .min(8, "Senha muito curta."),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>