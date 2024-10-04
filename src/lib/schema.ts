import { z } from 'zod'

const isDateValid = (value: Date) => {
   const birthDate = new Date(value)
   const currentDate = new Date()

   const age = currentDate.getFullYear() - birthDate.getFullYear()

   return age >= 18 && age <= 70
}

export const formSchema = z
   .object({
      username: z
         .string()
         .min(3, { message: 'Username must be at least min 3 characters' })
         .max(10, { message: 'Username is too long, name must be at most max 10 characters' })
         .regex(/^[a-zA-Z0-9]+$/, { message: 'Username can only contain letters and numbers' }),

      email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }).endsWith('@gmail.com', { message: 'Email must end with @gmail.com' }),

      password: z.string().min(3, { message: 'Password must be at least min 3 characters' }).max(10, { message: 'Password is too long, name must be at most max 10 characters' }),

      confirmPassword: z.string().min(3, { message: 'Password must be at least min 3 characters' }).max(10, { message: 'Password is too long, name must be at most max 10 characters' }),

      terms: z.boolean().refine((val) => val, {
         message: 'You must accept the terms and conditions',
      }),

      dateofbirth: z.date().refine(isDateValid, {
         message: 'Date of birth must be between 18 and 70 years old',
      }),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'], // specify the path of the error
   })
