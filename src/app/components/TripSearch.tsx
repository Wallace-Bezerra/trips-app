'use client'
import React, { SyntheticEvent } from 'react'
import Button from './Button'
import CurrencyInput from './CurruncyInput'
import Input from './Input'
import DatePicker from './DatePicker'

export const TripSearch = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4 bg-bg-word bg-cover bg-center bg-no-repeat px-5 pt-5 text-xl font-semibold">
      <h1>
        Encontre sua próxima{' '}
        <span className="text-primaryLighter">viagem!</span>
      </h1>
      <div className="flex w-full flex-col gap-4">
        <Input placeholder="Onde você quer ir?" />
        <div className="flex gap-4">
          <DatePicker
            className="w-full"
            placeholderText="Primeira data"
            onChange={function (
              date: Date | null,
              event: SyntheticEvent<any, Event> | undefined,
            ): void {
              throw new Error('Function not implemented.')
            }}
          />
          <CurrencyInput className="w-full" placeholder="Orçamento?" />
        </div>
      </div>
      <Button>Pesquisar</Button>
    </div>
  )
}
