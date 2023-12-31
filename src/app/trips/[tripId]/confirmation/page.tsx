'use client'

import { fadeIn } from '@/animation/variants'
import Button from '@/app/components/Button'
import { Trip } from '@prisma/client'
import { loadStripe } from '@stripe/stripe-js'
import { motion } from 'framer-motion'
import { signIn, useSession } from 'next-auth/react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { toast } from 'react-toastify'

type searchParamsProps = {
  startDate: string
  endDate: string
  guests: string
}
interface TripConfirmationProps {
  params: { tripId: string }
  searchParams: searchParamsProps
}

export default function TripConfirmation({
  params,
  searchParams,
}: TripConfirmationProps) {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [totalPaid, setTotaPaid] = useState(0)
  const { status } = useSession()
  const router = useRouter()
  const getTrip = useCallback(
    async (searchParams: searchParamsProps, id: string) => {
      const data = await fetch('/api/trips/check', {
        method: 'POST',
        body: JSON.stringify({
          startDate: searchParams.startDate,
          endDate: searchParams.endDate,
          guests: searchParams.guests,
          tripId: id,
        }),
      })
      const response = await data.json()
      if (response.error) {
        router.back()
        console.log(response.error.code)
        setError(response.error.code)
      }
      setTrip(response.trip)
      setTotaPaid(response.totalPaid)
    },
    [],
  )

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn()
    }
    getTrip(searchParams, params.tripId)
  }, [status])

  if (!trip) {
    return (
      <div className="container flex w-full flex-1 flex-col gap-5 px-5 pt-28">
        {error}
      </div>
    )
  }
  const handleBuyClick = async () => {
    setIsLoading(true)
    const res = await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify({
        tripId: params.tripId,
        startDate: searchParams.startDate,
        endDate: searchParams.endDate,
        totalPaid,
        coverImage: trip.coverImage,
        guests: Number(searchParams.guests),
        description: trip.description,
        name: trip.name,
      }),
    })
    if (!res.ok) {
      return toast.error('Ocorreu um erro!')
    }
    const { sessionId } = await res.json()
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_KEY as string,
    )
    await stripe?.redirectToCheckout({ sessionId })
    setIsLoading(false)
  }
  return (
    <motion.div className="container mx-auto mb-[160px] flex w-full max-w-lg flex-1 flex-col gap-5 px-5 pt-10">
      <motion.h3
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="mb-5 text-lg font-semibold text-primaryDarker"
      >
        Sua viagem
      </motion.h3>
      <motion.div
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className=" rounded-xl border border-[#BBBFBF] p-5"
      >
        <div className="flex items-center gap-7 border-b border-b-[#BBBFBF] pb-5">
          <Image
            className="h-full min-h-[106px] w-full max-w-[124px] rounded-xl object-cover"
            width={500}
            height={500}
            quality={100}
            alt=""
            src={trip.coverImage}
          />
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-base font-semibold text-primaryDarker">
              {trip!.name}
            </h2>
            <div className="flex items-center gap-2">
              <ReactCountryFlag countryCode={trip?.countryCode} svg />
              <p className="text-xs font-medium text-grayPrimary underline">
                {trip?.location}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="mb-[12px] text-sm font-semibold text-primaryDarker">
            Informações do preço
          </h3>
          <div className="flex justify-between">
            <p className="text-sm font-medium text-primaryDarker">Total</p>
            <p className="text-sm font-semibold text-primaryDarker">
              {`R$ ${totalPaid}`}
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn('up', 0.6)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="flex flex-col gap-5"
      >
        <div>
          <p className="text-sm font-normal leading-relaxed text-primaryDarker">
            Data
          </p>
          <span className="text-sm font-normal leading-relaxed text-primaryDarker">
            {`${new Date(
              searchParams.startDate.trim(),
            ).getDate()} de ${new Date(
              searchParams.startDate.trim(),
            ).toLocaleString('default', { month: 'long' })} - ${new Date(
              searchParams.endDate.trim(),
            ).getDate()} de ${new Date(
              searchParams.endDate.trim(),
            ).toLocaleString('default', { month: 'long' })}`}
          </span>
        </div>
        <div>
          <p className="text-sm font-normal leading-relaxed text-primaryDarker">
            Hóspedes
          </p>
          <span className="text-sm font-normal leading-relaxed text-primaryDarker">
            {searchParams.guests === '1'
              ? '1 hóspede'
              : `${searchParams.guests}  hóspedes`}
          </span>
        </div>
        <Button
          isLoading={isLoading}
          onClick={handleBuyClick}
          variant="primary"
        >
          Finalizar Compra
        </Button>
      </motion.div>
    </motion.div>
  )
}
