import { z } from 'zod'

export const notificationSchema = z.object({

    title: z
        .string()
        .trim()
        .min(1, "Digite o título"),

    description: z
        .string()
        .trim()
        .min(1, "Digite a descrição")

})

export type NotificationSchema = z.infer<typeof notificationSchema>