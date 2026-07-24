import { email, z } from 'zod'

export const forgotPasswordSchema = z.object({

    email: z
        .string()
        .trim()
        .email("Insira um email válido.")
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>