'use client'
import { Toaster } from 'sonner'

export const Sonner = () => {
  return (
    <Toaster
      duration={4000}
      visibleToasts={1}
      position="top-right"
    />
  )
}
