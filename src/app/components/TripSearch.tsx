'use client'
import React from 'react'
import Button from './Button'
import CurrencyInput from './CurruncyInput'
import Input from './Input'
import DatePicker from './DatePicker'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { fadeIn } from '@/animation/variants'

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
    <div
      className="flex w-full flex-col items-center gap-4 bg-bg-word bg-cover bg-center bg-no-repeat px-5 pt-5 text-xl font-semibold 
    md:py-20
    "
    >
      <motion.h1
        variants={fadeIn('up', 0)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="md:mb-5 md:text-3xl"
      >
        Encontre sua próxima{' '}
        <span className="text-primaryLighter ">viagem!</span>
      </motion.h1>
      <motion.form
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        onSubmit={handleSubmit(onSubimit)}
        className="flex w-full max-w-5xl flex-col gap-4 lg:flex-row"
      >
        <Input
          {...register('destination', {
            required: {
              value: true,
              message: 'O Destino é obrigatório',
            },
          })}
          error={!!errors.destination}
          className="w-full"
          errorMessage={errors.destination?.message}
          placeholder="Onde você quer ir?"
        />
        <div className="flex w-full gap-4">
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
          <CurrencyInput
            {...register('budget')}
            className="w-full"
            placeholder="Orçamento?"
          />
        </div>
        <Button className="lg:w-1/2" variant="primary">
          Pesquisar
        </Button>
      </motion.form>
    </div>
  )
}
