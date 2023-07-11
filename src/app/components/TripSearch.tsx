'use client'
import React from 'react'
import Button from './Button'
import CurrencyInput from './CurruncyInput'
import Input from './Input'
import DatePicker from './DatePicker'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface TripsSearchForm {
  budget: number
  startDate: Date | null
  destination: string
}
export const TripSearch = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TripsSearchForm>()
  const router = useRouter()
  const onSubimit = (data: TripsSearchForm) => {
    console.log(data)
    router.push(
      `/trips/search?destination=${data.destination}&startDate=${
        data.startDate?.toISOString() ?? ''
      }&budget=${data.budget}`,
    )
  }
  return (
    <div className="flex w-full flex-col items-center gap-4 bg-bg-word bg-cover bg-center bg-no-repeat px-5 pt-5 text-xl font-semibold">
      <h1>
        Encontre sua próxima{' '}
        <span className="text-primaryLighter">viagem!</span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubimit)}
        className="flex w-full flex-col gap-4"
      >
        <Input
          {...register('destination', {
            required: {
              value: true,
              message: 'O Destino é obrigatório',
            },
          })}
          error={!!errors.destination}
          errorMessage={errors.destination?.message}
          placeholder="Onde você quer ir?"
        />
        <div className="flex gap-4">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                minDate={new Date()}
                // maxDate={trip.endDate}
                dateFormat="dd/MM/yyyy"
                className="w-full"
                error={!!errors.startDate}
                errorMessage={errors.startDate?.message}
                placeholderText="Data de Ínicio"
              />
            )}
          />
          {/* <DatePicker
            className="w-full"
            placeholderText="Primeira data"
            onChange={function (
              date: Date | null,
              event: SyntheticEvent<any, Event> | undefined,
            ): void {
              throw new Error('Function not implemented.')
            }}
          /> */}
          <CurrencyInput
            {...register('budget')}
            className="w-full"
            placeholder="Orçamento?"
          />
        </div>
        <Button variant="primary">Pesquisar</Button>
      </form>
    </div>
  )
}
