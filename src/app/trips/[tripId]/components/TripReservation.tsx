'use client'
import { Trip } from '@prisma/client'
import Button from '@/app/components/Button'
import DatePicker from '@/app/components/DatePicker'
import Input from '@/app/components/Input'
import { Controller, useForm } from 'react-hook-form'
import { differenceInDays } from 'date-fns'
interface TripsReservationForm {
  maxGuests: number
  startDate: Date | null
  endDate: Date | null
}
export const TripReservation = ({ trip }: { trip: Trip }) => {
  // const [startDate, setStartDate] = useState(new Date())

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TripsReservationForm>()
  console.log(errors)
  // console.log(startDate)
  const onSubmit = (data: any) => {
    console.log(data)
  }
  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const date = new Date()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mb-10 mt-5 w-full px-5 "
    >
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
          {...register('maxGuests', {
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
          error={!!errors.maxGuests}
          errorMessage={errors.maxGuests?.message}
        />
      </div>
      <div className="my-5 flex justify-between">
        <p className="text-sm font-medium text-primaryDarker">
          Total{' ('}
          {startDate && endDate && differenceInDays(endDate, startDate) > 0
            ? differenceInDays(endDate, startDate)
            : 0}{' '}
          noites {')'}
        </p>
        <p className="text-sm font-medium text-primaryDarker">
          R${' '}
          {startDate && endDate && differenceInDays(endDate, startDate) > 0
            ? differenceInDays(endDate, startDate) *
              Number(trip.pricePerDay.toString())
            : '0'}
        </p>
      </div>
      <div className="border-b pb-10">
        <Button variant="primary">Reservar agora</Button>
      </div>
    </form>
  )
}
