import { ResourceStatusArray } from '../../../shared/types/entity'

import { z } from 'zod'

export const productSchema = z.object({
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

export type ProductSchema = z.infer<typeof productSchema>

export const productUpdateSchema = z.object({
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

export type ProductUpdateSchema = z.infer<typeof productUpdateSchema>