'use client'
import { useHookForm } from '@/lib/useHookForm'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export const FormComponent = () => {
  const { form, onSubmit } = useHookForm()
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 overflow-auto bg-white px-8 py-5 grid w-full h-full"
        autoComplete="off"
      >
        {/* Username */}
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoFocus={true}
                  placeholder="Type your username here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Type your password here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm your Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm password please"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type your email address here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of Birth */}
        <FormField
          name="dateofbirth"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  className="calendar text-gray-400"
                  {...form.register('dateofbirth', {
                    valueAsDate: true,
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Accept terms and conditions */}
        <FormField
          name="terms"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid place-items-center">
              <FormLabel>Accept terms and conditions</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button */}
        <Button
          type="submit"
          variant={'outline'}
          className="w-fit place-self-center"
          disabled={form.formState.isSubmitting || !!Object.keys(form.formState.errors).length}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
