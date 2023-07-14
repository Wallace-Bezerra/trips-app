import { Trip } from '@prisma/client'
import { TripItem } from './TripItem'
import { prisma } from '@/lib/prisma'

export async function RecommendedTrips() {
  const trips: Trip[] = await prisma.trip.findMany()
  return (
    <div className="container mx-auto mb-14 mt-5 w-full px-5 md:mb-14 md:mt-5">
      <h2
        className="flex w-full items-center justify-center gap-3 whitespace-nowrap text-[#717171] 
        before:block before:h-[1px] before:w-full before:max-w-[455px] before:bg-[#BBBFBF] before:content-['']
        after:block after:h-[1px] after:w-full after:max-w-[455px] after:bg-[#BBBFBF] after:content-['']
      "
      >
        Destinos Recomendados
      </h2>
      <div className=" mt-5 flex flex-col items-center gap-5 md:mt-10 md:grid md:grid-cols-[repeat(auto-fit,minmax(290px,1fr))] md:gap-10">
        {trips?.map((trip) => {
          return <TripItem key={trip.id} trip={trip} />
        })}
      </div>
    </div>
  )
}
