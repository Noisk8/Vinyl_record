import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Return to Reality',
  description: 'Smoking zaza',
}

export default function RootLayout({ children,}: { children: React.ReactNode}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className='flex flex-col '>
        <h2> </h2>
        {children}
        </div>
        </body>
    </html>
  )
}
