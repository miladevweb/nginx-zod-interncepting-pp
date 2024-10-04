import Link from 'next/link'
import { FormComponent } from '@/components/form'
import { BackSVG } from '@/components/svg'

function AuthPage() {
  return (
    <div className="auth h-screen w-screen">
      <Link
        href={'/'}
        className="bg-gradient-to-r from-woodsmoke-500 to-woodsmoke-700 text-white font-bold text-lg w-10 h-10 text-center rounded-full my-3 mx-4 grid place-content-center hover:scale-110 duration-300 ease-in-out"
      >
        <BackSVG />
      </Link>

      <div className="grid grid-cols-[440px] w-screen h-80% justify-center">
        <FormComponent />
      </div>
    </div>
  )
}

export default AuthPage
