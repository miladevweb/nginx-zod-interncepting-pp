'use client'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react'

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const wrapper = useRef(null)
  const overlay = useRef(null)

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss],
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      onClick={onClick}
      className="fixed z-10 inset-0 mx-auto bg-black/[.5] backdrop-blur-[24px] flex justify-center items-center"
    >
      <div
        ref={wrapper}
        className="w-[440px] h-[600px]"
      >
        {children}
      </div>
    </div>
  )
}
