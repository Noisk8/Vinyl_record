import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <span className="text-center text-5xl font-bold text-cyan-300 animate-pulse">  Hola Gonorrea</span>
    <Link href="/about" >

      <button> about</button>
    </Link>
    </main>
  )
}

