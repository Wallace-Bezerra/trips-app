import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
interface ModalUserProps {
  setIsOpen: (boolean: boolean) => void
  handleLogoutClick: () => void
}
export const ModalUser = ({ setIsOpen, handleLogoutClick }: ModalUserProps) => {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const clickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', clickOutside)
    return () => {
      document.removeEventListener('click', clickOutside)
    }
  }, [])
  return (
    <motion.div
      ref={modalRef}
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
  )
}
