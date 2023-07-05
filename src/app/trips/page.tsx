import { prisma } from "@/lib/prisma"

const getTripes = async () => {
  const trips = await prisma.trip.findMany()
  console.log(trips)
}

export default function Trips() {
  getTripes()
  return (
    <div>Sobre</div>
  )
}
