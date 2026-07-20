import { z } from 'zod'

export const treatmentGroupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Nome muito curto.")
})

export type TreatmentGroupSchema = z.infer<typeof treatmentGroupSchema>;