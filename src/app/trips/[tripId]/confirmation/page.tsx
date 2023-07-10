/* eslint-disable prettier/prettier */
'use client'

import Button from '@/app/components/Button'
import { Trip } from '@prisma/client'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import ReactCountryFlag from 'react-country-flag'

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

  const getTrip = useCallback(
    async (searchParams: searchParamsProps, id: string) => {
      try {
        const data = await fetch('http://localhost:3000/api/trips/check', {
          method: 'POST',
          body: JSON.stringify({
            startDate: new Date(searchParams.startDate.trim()),
            endDate: new Date(searchParams.endDate.trim()),
            guests: searchParams.guests,
            tripId: id,
          }),
        })
        const response = await data.json()
        if (response.error) {
          console.log(response.error.code)
          setError(response.error.code)
        }
        setTrip(response.trip)
        setTotalPrice(response.totalPrice)
      } catch (error) {
        console.log(error)
      }
    },
    [],
  )

  useEffect(() => {
    getTrip(searchParams, params.tripId)
  }, [])
  console.log(trip)

  if (!trip) {
    return (
      <div className="container flex w-full flex-1 flex-col gap-5 px-5 pt-28">
        {error}
      </div>
    )
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
        <Button variant="primary">Finalizar Compra</Button>
      </div>
    </div>
  )
}
