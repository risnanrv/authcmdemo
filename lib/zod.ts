import { object, string } from "zod"

export const signInSchema = object({
  email: string().min(1, "Email is required").email("Invalid email"),
  password: string().min(8, "Min 8 characters").max(32, "Max 32 characters"),
})


export const signUpSchema = object({
  firstName: string().min(1),
  lastName: string().min(1),
  email: string().email(),
  password: string().min(8),
});