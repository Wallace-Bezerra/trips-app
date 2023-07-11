'use client'

import Button from '@/app/components/Button'
import { Trip } from '@prisma/client'
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
  // const trip = await prisma.trip.findUnique({ where: { id: params.tripId } })
  // const trip = console.log(searchParams)
  const [trip, setTrip] = useState<Trip | null>(null)
  const [error, setError] = useState<any>('')
  const [totalPrice, setTotalPrice] = useState(0)
  const { status, data } = useSession()
  const router = useRouter()
  console.log(data?.user.id)
  const getTrip = useCallback(
    async (searchParams: searchParamsProps, id: string) => {
      const data = await fetch('http://localhost:3000/api/trips/check', {
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
      setTotalPrice(response.totalPrice)
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
    const res = await fetch('http://localhost:3000/api/trips/reservation', {
      method: 'POST',
      body: JSON.stringify({
        tripId: params.tripId,
        userId: data?.user.id,
        startDate: searchParams.startDate,
        endDate: searchParams.endDate,
        totalPaid: totalPrice,
        guests: Number(searchParams.guests),
      }),
    })
    if (!res.ok) {
      return toast.error('Ocorreu um erro!')
    }
    router.push('/')
    toast.success('Reserva finalizada com sucesso!', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }
  return (
    <div className="container flex w-full flex-1 flex-col gap-5 px-5 pt-28">
      <h3 className="mb-5 text-lg font-semibold text-primaryDarker">
        Sua viagem
      </h3>
      <div className=" rounded-xl border border-[#BBBFBF] p-5">
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
            <div className="flex gap-2">
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
              {`R$ ${totalPrice}`}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
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
        <Button onClick={handleBuyClick} variant="primary">
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}
