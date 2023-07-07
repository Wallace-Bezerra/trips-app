import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const trips = await prisma.trip.findMany()
  return NextResponse.json(trips, { status: 200 })
}
