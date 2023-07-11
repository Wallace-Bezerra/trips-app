'use client'
import { Trip, TripReservation } from '@prisma/client'
// import ReactCountryFlag from 'react-country-flag'
import Button from '../components/Button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'

export default function MyTrips() {
  const { status, data } = useSession()
  const [reservations, setReservations] = useState<
    (TripReservation & { trip: Trip })[] | null
  >(null)

  const fetchReservations = async () => {
    if (!data?.user) {
      return
    }
    const response = await fetch(
      `http://localhost:3000/api/user/${data?.user.id}/reservations`,
    )
    const reservationData = await response.json()
    setReservations(reservationData)
  }
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
    fetchReservations()
  }, [status])

  if (status === 'unauthenticated') {
    return null
  }

  const handleDeleteReservation = async (id: string) => {
    const response = await fetch(
      `http://localhost:3000/api/trips/reservation/${id}`,
      {
        method: 'DELETE',
      },
    )
    if (!response.ok) {
      return toast.error('Ocorreu um erro!')
    }
    toast.success('Reserva Deletada com Sucesso!')
    fetchReservations()
  }

  return (
    <div className="container flex-1 px-5 pt-28">
      <h3 className="container mb-5 px-5 text-lg  font-semibold text-primaryDarker">
        Minhas Viagens
      </h3>
      <div className="container flex flex-col gap-10 px-5 pb-10">
        {reservations?.length === 0 && (
          <div>Você não possui nenhuma reserva</div>
        )}
        {reservations?.map((reservation) => {
          console.log(reservation.trip)
          return (
            <div
              key={reservation.id}
              className="flex w-full flex-1 flex-col gap-5 "
            >
              <div className=" rounded-xl border border-[#BBBFBF] p-5">
                <div className="flex items-center gap-7 border-b border-b-[#BBBFBF] pb-5">
                  <Image
                    className="h-full min-h-[106px] w-full max-w-[124px] rounded-xl object-cover"
                    width={500}
                    height={500}
                    quality={100}
                    alt=""
                    src={reservation.trip.coverImage}
                  />
                  <div className="flex flex-col items-start gap-2">
                    <h2 className="text-base font-semibold text-primaryDarker">
                      {reservation.trip.name}
                    </h2>
                    <div className="flex gap-2">
                      <ReactCountryFlag
                        countryCode={reservation.trip.countryCode}
                        svg
                      />
                      <p className="text-xs font-medium text-grayPrimary underline">
                        {reservation.trip.location}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="mb-[12px] text-sm font-semibold text-primaryDarker">
                    Sobre a Viagem
                  </h3>
                </div>
                <div className="flex flex-col gap-5 border-b border-b-[#BBBFBF] pb-5">
                  <div>
                    <p className="text-sm font-normal leading-relaxed text-primaryDarker">
                      Data
                    </p>
                    <span className="text-sm font-normal leading-relaxed text-primaryDarker">
                      {`${new Date(
                        reservation.startDate,
                      ).getDate()} de ${new Date(
                        reservation.startDate,
                      ).toLocaleString('default', {
                        month: 'long',
                      })} - ${new Date(
                        reservation.endDate,
                      ).getDate()} de ${new Date(
                        reservation.endDate,
                      ).toLocaleString('default', { month: 'long' })}`}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-normal leading-relaxed text-primaryDarker">
                      Hóspedes
                    </p>
                    <span className="text-sm font-normal leading-relaxed text-primaryDarker">
                      {reservation.guests === 1
                        ? '1 hóspede'
                        : `${reservation.guests}  hóspedes`}
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="mb-[12px] text-sm font-semibold text-primaryDarker">
                    Informações do preço
                  </h3>
                  <div className="mb-7 flex justify-between">
                    <p className="text-sm font-medium text-primaryDarker">
                      Total
                    </p>
                    <p className="text-sm font-semibold text-primaryDarker">
                      {`R$ ${reservation.totalPaid}`}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleDeleteReservation(reservation.id)}
                    variant="canceled"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}