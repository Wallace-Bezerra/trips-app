import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 flex h-20 w-full flex-col items-center justify-center gap-2 bg-walterWhite py-5 md:h-24">
      <Link href="/">
        <Image
          src="/Logo.svg"
          className="w-28 sm:w-40"
          alt="Full Stack Week"
          width={183}
          height={32}
        />
      </Link>
      <p className="text-xs sm:text-sm">Todos os direitos reservados.</p>
    </footer>
  )
}
