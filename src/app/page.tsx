import Link from 'next/link'

function HomePage() {
  return (
    <div className="h-screen grid place-items-center home">
      <h1 className="text-3xl font-bold">Hello world!!!!!</h1>
      <Link href={'/auth'}>LOGIN</Link>
    </div>
  )
}

export default HomePage
