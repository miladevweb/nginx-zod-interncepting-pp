import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { formSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const useHookForm = () => {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         username: '',
         password: '',
         confirmPassword: '',
         terms: false,
         email: '',
      },
   })

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      const localDate = new Date(values.dateofbirth)
      localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset())
      values.dateofbirth = localDate.toISOString() as any

      const response = await fetch('/api/auth', {
         method: 'POST',
         body: JSON.stringify(values),
      })

      console.log('ESTAMOS EN FRONT')
      const data = await response.json()
      if (data.message) toast.error(data.message)
      else toast.success('Account created successfully')
   }
   return { form, onSubmit }
}
