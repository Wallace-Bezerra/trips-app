import { prisma } from '@/lib/prisma'
import { TripHeader } from './components/TripHeader'
import { TripReservation } from './components/TripReservation'
import { TripDescription } from './components/TripDescription'
import { TripHighlights } from './components/TripHighlights'
import { TripLocation } from './components/TripLocation'

interface TripDetailProps {
  params: { tripId: string }
}
const getTrip = async (id: string) => {
  const trip = await prisma.trip.findUniqueOrThrow({
    where: {
      id,
    },
  })
  return trip
}
const TripDetails = async ({ params }: TripDetailProps) => {
  const trip = await getTrip(params.tripId)
  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-between pt-[106px]">
      <TripHeader trip={trip} />
      <TripReservation trip={trip} />
      <TripDescription description={trip.description} />
      <TripHighlights trip={trip} />
      <TripLocation address={trip.location} description={trip.description} />
    </div>
  )
}
export default TripDetails
