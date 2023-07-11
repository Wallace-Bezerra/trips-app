import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const req = await request.json()
  const { tripId, userId, startDate, endDate, totalPaid, guests } = req

  const trip = await prisma.trip.findUnique({
    where: {
      id: req.tripId,
    },
  })
  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'TRIP_NOT_FOUND',
        },
      }),
      {
        status: 404,
      },
    )
  }

  await prisma.tripReservation.create({
    data: {
      tripId,
      userId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPaid,
      guests,
    },
  })

  return new NextResponse(
    JSON.stringify({
      success: true,
    }),
    {
      status: 201,
    },
  )
}
