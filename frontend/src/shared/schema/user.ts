import { z } from 'zod'

export const userSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Nome muito curto."),

    email: z
        .string()
        .trim()
        .min(1, "Digite o email.")
        .email("Email inválido."),

    role: z
        .enum(["ROLE_ADMIN", "ROLE_COLLABORATOR"]),

    password: z
        .string()
        .min(8, "Senha muito curta.")
})

export type UserSchema = z.infer<typeof userSchema>;

export const userUpdateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Digite o nome."),

    email: z
        .string()
        .trim()
        .min(1, "Digite o email.")
        .email("Email inválido."),

    role: z
        .enum(["ROLE_ADMIN", "ROLE_COLLABORATOR"]),
})

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;