import {z} from 'zod'

export const loginValidationSchema = z.object({
    email: z.string().email('Invalid email format').min(6, 'Minimum of 3 characters').nonempty("Email is required"),
    password: z.string().min(6, "Minimum of 6 characters").nonempty("Password is required"),
})