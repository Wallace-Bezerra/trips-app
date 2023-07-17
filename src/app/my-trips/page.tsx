'use client'
import { Trip, TripReservation } from '@prisma/client'
import Button from '../components/Button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeIn } from '@/animation/variants'
import { ModalCancelled } from '../components/ModalCancelled'

export default function MyTrips() {
  const { status, data } = useSession()
  const [isOpenModalCancelled, setIsOpenModalCancelled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [reservations, setReservations] = useState<
    (TripReservation & { trip: Trip })[] | null
  >(null)

  const fetchReservations = async () => {
    if (!data?.user) {
      return
    }
    const response = await fetch(`/api/user/${data?.user.id}/reservations`)
    const reservationData = await response.json()
    setReservations(reservationData)
    setIsLoading(false)
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
    const response = await fetch(`/api/trips/reservation/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      return toast.error('Ocorreu um erro!')
    }
    setIsOpenModalCancelled(false)
    toast.success('Reserva Deletada com Sucesso!', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
    fetchReservations()
  }

  return (
    <div className="container mx-auto mb-[160px] flex flex-1 flex-col px-5 pt-10 md:justify-center">
      <motion.h3
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="container mb-5 px-5 text-center text-lg  font-semibold text-primaryDarker"
      >
        Minhas Viagens
      </motion.h3>
      <motion.div
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="container flex flex-col flex-wrap content-center justify-center gap-10 px-5 pb-10 lg:flex-row "
      >
        {isLoading && (
          <div className="flex h-[500px] w-[380px] animate-pulse rounded-2xl bg-gray-200 px-5"></div>
        )}
        {reservations?.length === 0 && (
          <div>Você não possui nenhuma reserva</div>
        )}
        {reservations?.map((reservation) => {
          return (
            <div
              key={reservation.id}
              className="flex w-full max-w-[380px] flex-1 flex-col gap-5 "
            >
              <div className=" rounded-xl border border-[#BBBFBF] p-5">
                <div className="flex flex-wrap items-center gap-7 border-b border-b-[#BBBFBF] pb-5 xl:flex-nowrap">
                  <Image
                    className="h-full min-h-[106px] w-full rounded-xl object-cover md:max-w-[124px]"
                    width={500}
                    height={500}
                    quality={100}
                    alt=""
                    src={reservation.trip.coverImage}
                  />
                  <div className="flex w-full max-w-[250px] flex-col items-start gap-2">
                    <h2 className="text-base font-semibold text-primaryDarker">
                      {reservation.trip.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
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
                    onClick={() => setIsOpenModalCancelled((prev) => !prev)}
                    variant="canceled"
                  >
                    Cancelar
                  </Button>
                  <AnimatePresence>
                    {isOpenModalCancelled && (
                      <ModalCancelled
                        handleDeleteReservation={handleDeleteReservation}
                        setIsOpenModalCancelled={setIsOpenModalCancelled}
                        reservationId={reservation.id}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
