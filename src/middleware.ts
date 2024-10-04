import { formSchema } from '@/lib/schema'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   const { method } = request

   if (method !== 'POST') {
      return NextResponse.next()
   } else {
      const body = await request.json()
      body.dateofbirth = new Date(body.dateofbirth)
      const data = formSchema.safeParse(body)
      if (!data.success) {
         const { errors } = data.error
         return NextResponse.json(errors, {
            status: 400,
         })
      } else {
         return NextResponse.next()
      }
   }
}

export const config = {
   matcher: ['/api/:path*'],
}
