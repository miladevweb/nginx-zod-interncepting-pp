import { hash, compare } from 'bcrypt'

export const hashPassword = async (password: string) => {
   return await hash(password, 10)
   /* return a hashed password <string> */
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
   return await compare(password, hashedPassword)
   /* return a boolean value */
}
