import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

const generateSearchQuery = (
  destination: string,
  startDate?: string,
  budget?: string,
) => {
  let searchQuery: any = {
    OR: [
      {
        name: {
          search: destination.replace(/[\s\n\t]/g, '_'),
        },
        description: {
          search: destination.replace(/[\s\n\t]/g, '_'),
        },
        location: {
          search: destination.replace(/[\s\n\t]/g, '_'),
        },
      },
    ],
  }
  if (startDate) {
    searchQuery = {
      ...searchQuery,
      AND: [
        {
          startDate: {
            lte: new Date(startDate),
          },
          endDate: {
            gte: new Date(startDate),
          },
        },
      ],
    }
  }
  console.log(budget)
  if (budget) {
    searchQuery = {
      ...searchQuery,
      AND: [
        ...(searchQuery.AND ?? []),
        {
          pricePerDay: {
            lte: Number(budget),
          },
        },
      ],
    }
  }
  console.log(searchQuery)
  return searchQuery
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const destination = searchParams.get('destination')
  const startDate = searchParams.get('startDate')!
  const budget = searchParams.get('budget')?.replace('R$', '')
  console.log(destination)
  if (!destination) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'MISSING_DESTINATION_PARAMS',
        },
      }),
      {
        status: 200,
      },
    )
  }
  const searchTrips = await prisma.trip.findMany({
    where: generateSearchQuery(destination, startDate, budget),
  })
  console.log(searchTrips)
  if (searchTrips.length === 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'NOT_FOUND_SEARCH',
        },
      }),
      {
        status: 404,
      },
    )
  }
  return new NextResponse(JSON.stringify(searchTrips), {
    status: 200,
  })
}
