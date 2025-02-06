import {z} from 'zod'

export const registerValidationSchema = z.object({
    name: z.string().min(3, 'Minimum of 3 characters').nonempty("Name is required"),
    lastName: z.string().min(3, 'Minimum of 3 characters').nonempty("Lastname is required"),
    email: z.string().email('Invalid email format').min(6, 'Minimum of 3 characters').nonempty("Email is required"),
    password: z.string().min(6, "Minimum of 6 characters").nonempty("Password is required"),
})