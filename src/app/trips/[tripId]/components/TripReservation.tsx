'use client'
import { Trip } from '@prisma/client'
import Button from '@/app/components/Button'
import DatePicker from '@/app/components/DatePicker'
import Input from '@/app/components/Input'
import { Controller, useForm } from 'react-hook-form'
import { differenceInDays } from 'date-fns'
import { useRouter } from 'next/navigation'
interface TripsReservationForm {
  guests: number
  startDate: Date | null
  endDate: Date | null
}

export const TripReservation = ({ trip }: { trip: Trip }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
  } = useForm<TripsReservationForm>()
  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const date = new Date()
  const difference = differenceInDays(endDate!, startDate!)

  const router = useRouter()

  const onSubmit = async (data: TripsReservationForm) => {
    const request = await fetch('/api/trips/check', {
      method: 'POST',
      body: JSON.stringify({
        tripId: trip.id,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    })
    const response = await request.json()
    const error = response.error?.code
    if (error === 'TRIP_ALREADY_RESERVED') {
      setError('startDate', {
        message: 'Essa Data está reservada!',
      })
      return setError('endDate', {
        message: 'Essa Data está reservada!',
      })
    }
    if (error === 'INVALID_START_DATE')
      return setError('startDate', {
        message: 'Data inicial inválida!',
      })
    if (error === 'INVALID_END_DATE') {
      return setError('endDate', {
        message: 'Data final inválida!',
      })
    }
    router.push(
      `/trips/${trip.id}/confirmation?startDate=${data.startDate
        ?.toISOString()
        // eslint-disable-next-line prettier/prettier
        .trim()}&endDate=${data.endDate?.toISOString().trim()}&guests=${data.guests
      }`,
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mb-10 mt-5 w-full px-5 lg:order-2 lg:w-[400px] lg:self-start lg:rounded-lg lg:border lg:shadow-sm "
    >
      <p className="hidden pb-5 pt-7 text-primaryDarker lg:inline-block">
        <span className="text-xl font-semibold text-primaryDarker">
          R$ {trip.pricePerDay.toString()}
        </span>{' '}
        / noite
      </p>
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-4">
          <Controller
            name="startDate"
            rules={{
              required: {
                value: true,
                message: 'Data inicial é obrigatória',
              },
            }}
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                minDate={new Date()}
                maxDate={trip.endDate}
                dateFormat="dd/MM/yyyy"
                className="w-full"
                error={!!errors.startDate}
                errorMessage={errors.startDate?.message}
                placeholderText="Data de Ínicio"
              />
            )}
          />
          <Controller
            name="endDate"
            rules={{
              required: {
                value: true,
                message: 'Data final é obrigatória',
              },
            }}
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={startDate! > endDate! ? null : field.value}
                value={startDate! > endDate! ? '' : undefined}
                onChange={field.onChange}
                onBlur={field.onBlur}
                dateFormat="dd/MM/yyyy"
                ref={field.ref}
                disabled={!startDate}
                className="w-full disabled:cursor-not-allowed disabled:bg-slate-100 "
                minDate={
                  new Date(date.setDate(startDate?.getDate()! + 1)) ||
                  new Date()
                }
                maxDate={trip.endDate}
                error={!!errors.endDate}
                errorMessage={errors.endDate?.message}
                placeholderText="Data final"
              />
            )}
          />
        </div>
        <Input
          {...register('guests', {
            required: {
              value: true,
              message: 'Número de hóspedes é obrigatório',
            },
            max: {
              value: trip.maxGuests,
              message: `Número máximo de hóspedes é ${trip.maxGuests}`,
            },
            min: { value: 1, message: 'Número mínimo de hóspedes é 1' },
          })}
          type="number"
          min="0"
          placeholder={`Hóspedes no maxìmo (${trip.maxGuests})`}
          error={!!errors.guests}
          errorMessage={errors.guests?.message}
        />
      </div>
      <div className="my-5 flex justify-between">
        <p className="text-sm font-medium text-primaryDarker">
          Total{' ('}
          {startDate && endDate && difference > 0
            ? difference === 1
              ? difference + ' noite'
              : difference + ' noites'
            : 0 + ' noite '}
          {')'}
        </p>
        <p className="text-sm font-medium text-primaryDarker">
          R${' '}
          {startDate && endDate && differenceInDays(endDate, startDate) > 0
            ? differenceInDays(endDate, startDate) * +trip.pricePerDay
            : '0'}
        </p>
      </div>
      <div className="border-b pb-10 lg:border-none">
        <Button variant="primary">Reservar agora</Button>
      </div>
    </form>
  )
}
