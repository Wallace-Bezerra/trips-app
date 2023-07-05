import './globals.css'
import { Poppins } from 'next/font/google'
import { NextAuthProvider } from './providers/auth'
import { ReactNode } from 'react'

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '500', '600'] })

export const metadata = {
  title: 'FSW Trips',
  description: 'Sistema de Reservas de Viagens',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <NextAuthProvider>
          <header>
            <div>LOGO</div>
          </header>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
