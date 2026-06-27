import { z } from 'zod'

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Digite o email.")
        .email("Email inválido."),

    password: z
        .string()
        .min(8, "Senha muito curta.")
})

export type LoginSchema = z.infer<typeof loginSchema>;