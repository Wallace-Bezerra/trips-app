'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const handleLoginClick = () => {
  signIn()
}
const handleLogoutClick = () => {
  signOut()
}
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data, status } = useSession()
  const router = useRouter()
  const user = data?.user

  return (
    <header className="sticky top-0 z-10 flex h-[106px] w-full items-center justify-between border-b border-gray-200 bg-white px-5 py-7">
      <Link href="/">
        <Image src="/Logo.svg" alt="Full Stack Week" width={183} height={32} />
      </Link>
      <div>
        {status === 'unauthenticated' && (
          <div>
            <button
              onClick={handleLoginClick}
              className="text-xl font-semibold text-primaryLighter"
            >
              Login
            </button>
          </div>
        )}

        {status === 'authenticated' && user && (
          <motion.div
            className="relative flex flex-row-reverse items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
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
              quality={100}
              width={50}
              height={50}
            />
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute bottom-[-105px] right-0 flex h-[100px] w-[150px] flex-col items-start justify-between rounded-xl border border-solid border-[#BBBFBF] bg-[white] px-4 py-3 text-sm shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      router.push('/my-trips')
                    }}
                  >
                    Minhas Viagens
                  </button>

                  <button onClick={handleLogoutClick} className="self-end">
                    Sair
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {status === 'loading' && (
          <div className="h-[50px] w-[90px] animate-pulse rounded-2xl bg-gray-200 ">
            <div className="h-[50px] rounded-full bg-gray-200"></div>
          </div>
        )}
      </div>
    </header>
  )
}
