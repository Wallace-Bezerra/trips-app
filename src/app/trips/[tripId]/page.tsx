import { TripHeader } from '@/app/components/TripHeader'
import { prisma } from '@/lib/prisma'

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
    </div>
  )
}
export default TripDetails
