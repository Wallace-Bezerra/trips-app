import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
type paramsProps = {
  params: { userId: string }
}
export async function GET(
  req: NextRequest,
  { params: { userId } }: paramsProps,
) {
  if (!userId) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'USER_ID_NOT_FOUND',
        },
      }),
      {
        status: 400,
      },
    )
  }
  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId,
    },
    include: {
      trip: true,
    },
  })
  return new NextResponse(JSON.stringify(reservations), {
    status: 200,
  })
}
