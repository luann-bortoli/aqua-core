import { z } from 'zod'

export const treatmentSubGroupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Nome muito curto."),

    groupId: z
        .string()
        .trim()
        .optional()
})

export type TreatmentSubGroupSchema = z.infer<typeof treatmentSubGroupSchema>;