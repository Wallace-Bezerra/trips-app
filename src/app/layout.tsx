import './globals.css'
import { Poppins } from 'next/font/google'
import { NextAuthProvider } from './providers/auth'
import { ReactNode } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ToastyProvider } from './providers/toasty'

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '500', '600'] })

export const metadata = {
  title: 'FSW Trips',
  description: 'Sistema de Reservas de Viagens',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className} container relative mx-auto flex min-h-screen flex-col`}
      >
        <NextAuthProvider>
          <ToastyProvider>
            <Header />
            {children}
            <Footer />
          </ToastyProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
