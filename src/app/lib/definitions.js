import { z } from 'zod'

export const SigninFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(3, { message: 'Be at least 3 characters long' })
})