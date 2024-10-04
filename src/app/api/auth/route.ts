import { prisma } from '@schema/db'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, verifyPassword } from '@/lib/hasher'

export async function POST(req: NextRequest) {
   const origin = req.headers.get('origin')
   const data = await req.json()
   try {
      const { username, password, email, dateofbirth, terms, confirmPassword } = data

      const hashedPassword = await hashPassword(password)
      const hashedConfirmPassword = await hashPassword(confirmPassword)

      const user = await prisma.user.create({
         data: {
            terms,
            email,
            username,
            dateofbirth,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
         },
      })

      return NextResponse.json(user, {
         status: 200,
         headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Content-Type': 'application/json',
         },
      })
   } catch (error) {
      console.log(error)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
         if (error.code === 'P2002' && error.meta) {
            const target = (error.meta.target as string[])[0]
            return NextResponse.json(
               {
                  message: `${target.toUpperCase()}:  ${data[target]} already exist!!!`,
               },
               {
                  status: 403,
               },
            )
         }
      }
      return NextResponse.json(error, {
         status: 400,
      })
   }
}

// export async function GET(req: NextRequest) {
//    const origin = req.headers.get('origin')
//    const user = await prisma.user.findUnique({
//       where: {
//          username: 'username',
//       },
//    })

//    // const isUser = await verifyPassword('pass', user!.password)

//    return NextResponse.json(user, {
//       status: 200,
//       headers: {
//          'Access-Control-Allow-Origin': origin || '*',
//          'Content-Type': 'application/json',
//       },
//    })
// }
export async function GET(_req: NextRequest) {
   return NextResponse.json({
      message: 'hi',
   })
}
