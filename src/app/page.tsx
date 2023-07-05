'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Home() {
  const { data } = useSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  p-24 ">
      <div className="col flex">
        <h1>Ola {data?.user?.name}</h1>
        <Image
          className="rounded-full"
          src={data?.user?.image!}
          alt=""
          width={150}
          height={150}
          quality={100}
        />
      </div>
      <button
        onClick={() => {
          signIn()
        }}
        className="rounded-xl bg-gray-400 px-4 py-3"
      >
        Login com Google
      </button>
      <button
        onClick={() => {
          signOut()
        }}
        className="rounded-xl bg-gray-400 px-4 py-3"
      >
        Sair
      </button>
    </main>
  )
}
