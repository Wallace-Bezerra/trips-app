'use client'

import { useEffect, useState } from 'react'
import { Trip } from '@prisma/client'
import { TripItem } from '@/app/components/TripItem'
import { LoadingTripItem } from '@/app/components/LoadingTripItem'
interface TripsProps {
  searchParams: {
    budget?: string
    destination: string
    startDate: string
  }
}
const Trips = ({ searchParams }: TripsProps) => {
  const [searchTrips, setSearchTrips] = useState<Trip[] | null>(null)
  const [error, setError] = useState(false)
  console.log(searchParams)
  const { budget, destination, startDate } = searchParams
  useEffect(() => {
    const fetchSearch = async () => {
      const response = await fetch(
        `/api/trips/search?destination=${destination}&startDate=${
          startDate ?? 'teste'
        }&budget=${budget}`,
      )
      const data = await response.json()
      if (!response.ok) {
        if (data.error.code === 'NOT_FOUND_SEARCH') return setError(true)
        return
      }
      setSearchTrips(data)
    }
    fetchSearch()
  }, [])

  return (
    <div className="container mx-auto mb-[130px] flex w-full flex-1 flex-col items-center gap-5 px-5 pb-10 pt-10">
      <div className="flex flex-col items-center md:gap-4">
        <h3 className="text-xl font-semibold text-primaryDarker md:text-4xl">
          Hospedagens Encontradas
        </h3>
        <p className="text-base font-normal leading-relaxed text-primaryDarker md:text-xl">
          Listamos os melhores locais para você!
        </p>
      </div>
      {error && <div>Não foi encontrado nada!</div>}
      {!searchTrips && !error && <LoadingTripItem />}
      <div className="flex w-full flex-col gap-6 md:mt-10 md:grid md:grid-cols-[repeat(auto-fit,minmax(290px,1fr))] md:justify-items-center md:gap-10">
        {searchTrips &&
          searchTrips.map((trip) => {
            return <TripItem key={trip.id} trip={trip} />
          })}
      </div>
    </div>
  )
}
export default Trips
