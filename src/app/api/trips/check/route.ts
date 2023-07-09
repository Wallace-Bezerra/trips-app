import { prisma } from '@/lib/prisma'
import { isAfter, isBefore } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const req = await request.json()
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

  if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'INVALID_START_DATE',
        },
      }),
      {
        status: 400,
      },
    )
  }
  if (isAfter(new Date(req.endDate), new Date(trip.endDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'INVALID_END_DATE',
        },
      }),
      {
        status: 400,
      },
    )
  }

  const reservation = await prisma.tripReservation.findMany({
    where: {
      tripId: req.tripId,
      startDate: {
        lte: new Date(req.endDate),
      },
      endDate: {
        gte: new Date(req.startDate),
      },
    },
  })
  if (reservation.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: { code: 'TRIP_ALREADY_RESERVED' },
      }),
    )
  }
  return new NextResponse(
    JSON.stringify({
      success: true,
    }),
  )
}
