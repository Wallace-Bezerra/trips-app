'use client'

import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const ToastyProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  )
}
