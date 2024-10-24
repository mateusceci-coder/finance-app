import { z } from 'zod'

export const createUserSchema = z.object({
    first_name: z.string().trim().min(3),
    last_name: z.string().trim().min(3),
    email: z.string().email().trim().min(3),
    password: z.string().trim().min(6),
})

export const updateUserSchema = createUserSchema.partial().strict()
