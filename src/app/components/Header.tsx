'use client'

import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const handleLoginClick = () => {
  signIn()
}
const handleLogoutClick = () => {
  signOut()
}
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data, status } = useSession()
  const user = data?.user

  return (
    <header className="container fixed flex h-[106px] items-center justify-between px-5 py-7">
      <Image src="/logo.svg" alt="Full Stack Week" width={183} height={32} />
      {status === 'unauthenticated' && (
        <button
          onClick={handleLoginClick}
          className="text-xl font-semibold text-primaryLighter"
        >
          Login
        </button>
      )}

      {status === 'authenticated' && user && (
        <div className="relative flex flex-row-reverse items-center gap-4">
          <AiOutlineMenu
            onClick={() => {
              setIsOpen((prev) => !prev)
            }}
            size={24}
            className="cursor-pointer text-primaryDarker"
          />
          <Image
            className="rounded-full"
            src={user.image!}
            alt={`Usuário ${data.user?.name}`}
            width={50}
            height={50}
          />
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute bottom-[-150px] right-0 flex h-[144px] w-[150px] flex-col items-start justify-between rounded-xl border border-solid border-[#BBBFBF] bg-[white] px-4 py-3 text-sm shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <button>Minhas Viagens</button>
                <button onClick={handleLogoutClick} className="self-end">
                  Sair
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {status === 'loading' && <div>Carregando</div>}
    </header>
  )
}
