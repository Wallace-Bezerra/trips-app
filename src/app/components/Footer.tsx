import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 bg-walterWhite py-5">
      <Link href="/">
        <Image src="/Logo.svg" alt="Full Stack Week" width={183} height={32} />
      </Link>
      <p>Todos os direitos reservados.</p>
    </div>
  )
}
