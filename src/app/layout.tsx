import './globals.css'
import { Poppins } from 'next/font/google'
import { NextAuthProvider } from './providers/auth'
import { ReactNode } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '500', '600'] })

export const metadata = {
  title: 'FSW Trips',
  description: 'Sistema de Reservas de Viagens',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className} container mx-auto flex min-h-screen flex-col`}
      >
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  )
}
