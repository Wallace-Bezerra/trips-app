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
    <div className="container mx-auto mb-[160px] flex w-full flex-col items-center justify-between">
      <TripHeader trip={trip} />
      <div className="flex w-full flex-col lg:mt-10 lg:flex-row lg:justify-between lg:gap-4 lg:pr-5">
        <TripReservation trip={trip} />
        <div className="flex flex-col lg:w-[60%]">
          <TripDescription description={trip.description} />
          <TripHighlights trip={trip} />
        </div>
      </div>
      <TripLocation
        descriptionLocation={trip.descriptionLocation}
        address={trip.location}
        description={trip.description}
      />
    </div>
  )
}
export default TripDetails
