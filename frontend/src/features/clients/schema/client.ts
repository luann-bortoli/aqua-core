import { StatesArray } from '@/src/app/(dashboard)/clients/page';
import { z } from 'zod'

export const clientSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Nome muito curto."),

    email: z
        .string()
        .trim()
        .min(1, "Digite o email.")
        .email("Email inválido."),

    address: z.object({
        state: z
            .enum(StatesArray),

        city: z
            .string()
            .trim()
            .min(1, "Digie a cidade."),
    }),

    phone: z
        .string()
        .trim()
        .min(10, "Telefone muito curto.")
        .max(20, "Telefone muito grande."),


    password: z
        .string()
        .min(8, "Senha muito curta.")
})

export type ClientSchema = z.infer<typeof clientSchema>

export const clientUpdateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Digite o nome."),

    email: z
        .string()
        .trim()
        .min(1, "Digite o email.")
        .email("Email inválido."),

    address: z.object({
        state: z
            .enum(StatesArray),

        city: z
            .string()
            .trim()
            .min(1, "Digie a cidade."),
    }),

    phone: z
        .string()
        .trim()
        .min(10, "Telefone muito curto.")
        .max(20, "Telefone muito grande.")
})

export type ClientUpdateSchema = z.infer<typeof clientUpdateSchema>;