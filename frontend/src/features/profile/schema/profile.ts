import { z } from 'zod'

export const profileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Nome muito curto"),

    email: z
        .string()
        .optional(),

    newPassword: z
        .string()
        .trim()
        .refine(
            (v) => v === "" || v.length >= 8,
            "Senha muito pequena."
        )
        .transform((v) => (v === "" ? undefined : v))
        .optional()

})

export type ProfileSchema = z.infer<typeof profileSchema>