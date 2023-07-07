import { Trip } from '@prisma/client'
import { TripItem } from './TripItem'
import { prisma } from '@/lib/prisma'

// const getTrip = async () => {
//   const trips = await prisma.trip.findMany()
//   return trips
// }
export async function RecommendedTrips() {
  // const trips: Trip[] = await fetch('http://localhost:3000/api/trips').then(
  //   (res) => res.json(),
  // )
  const trips: Trip[] = await prisma.trip.findMany()

  return (
    <div className="container mx-auto my-5 w-full px-5">
      <h2
        className="flex w-full items-center gap-3 whitespace-nowrap text-[#717171] 
        before:block before:h-[1px] before:w-full before:max-w-[455px] before:bg-[#BBBFBF] before:content-['']
        after:block after:h-[1px] after:w-full after:max-w-[455px] after:bg-[#BBBFBF] after:content-['']
      "
      >
        Destinos Recomendados
      </h2>
      <div className="mt-5 flex flex-col items-center gap-5">
        {trips?.map((trip) => {
          return <TripItem key={trip.id} trip={trip} />
        })}
      </div>
    </div>
  )
}
