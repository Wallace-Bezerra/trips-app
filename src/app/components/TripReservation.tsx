'use client'
import { SyntheticEvent } from 'react'
import Button from './Button'
import DatePicker from './DatePicker'
import Input from './Input'
import { Trip } from '@prisma/client'

export const TripReservation = ({ trip }: { trip: Trip }) => {
  return (
    <div className="container mt-5 w-full px-5">
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
          {/* {tr} */}
        </p>
        <p className="text-sm font-medium text-primaryDarker">R$2.660</p>
      </div>
      <Button>Reservar agora</Button>
    </div>
  )
}
