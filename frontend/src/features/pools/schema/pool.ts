import { ResourceStatusArray } from '../../../shared/types/entity'

import { z } from 'zod'

export const poolSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Digite o nome"),

    status: z
        .enum(ResourceStatusArray),

    image: z
        .instanceof(FileList)
        .refine(files => files.length === 1, "Escolha 1 imagem")
        .refine(
            files => [
                "image/png",
                "image/jpeg",
                "image/webp"
            ].includes(files[0]?.type),
            "Formato inválido."
        )
})

export type PoolSchema = z.infer<typeof poolSchema>

export const poolUpdateSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Digite o nome."),

    status: z
        .enum(ResourceStatusArray),

    image: z
        .instanceof(FileList)
        .optional()
})

export type PoolUpdateSchema = z.infer<typeof poolUpdateSchema>