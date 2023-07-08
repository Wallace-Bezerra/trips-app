'use client'
import { SyntheticEvent } from 'react'
import { Trip } from '@prisma/client'
import Button from '@/app/components/Button'
import DatePicker from '@/app/components/DatePicker'
import Input from '@/app/components/Input'

export const TripReservation = ({ trip }: { trip: Trip }) => {
  return (
    <div className="container mb-10 mt-5 w-full px-5 ">
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-4">
          <DatePicker
            className="w-full"
            placeholderText="Data de Ínicio"
            onChange={function (
              date: Date | null,
              event: SyntheticEvent<any, Event> | undefined,
            ): void {
              throw new Error('Function not implemented.')
            }}
          />
          <DatePicker
            onChange={function (
              date: Date | null,
              event: SyntheticEvent<any, Event> | undefined,
            ): void {
              throw new Error('Function not implemented.')
            }}
            className="w-full"
            placeholderText="Data Final"
          />
        </div>
        <Input placeholder={`Hóspedes no maxìmo (${trip.maxGuests})`} />
      </div>
      <div className="my-5 flex justify-between">
        <p className="text-sm font-medium text-primaryDarker">
          Total (7 noites)
        </p>
        <p className="text-sm font-medium text-primaryDarker">R$2.660</p>
      </div>
      <div className="border-b pb-10">
        <Button variant="primary">Reservar agora</Button>
      </div>
    </div>
  )
}
