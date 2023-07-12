import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})
export async function POST(request: Response) {
  const sig = request.headers.get('stripe-signature')!
  const text = await request.text()

  const event = stripe.webhooks.constructEvent(
    text,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET_KEY!,
  )

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any

    await prisma.tripReservation.create({
      data: {
        tripId: session.metadata.tripId,
        userId: session.metadata.userId,
        startDate: new Date(session.metadata.startDate),
        endDate: new Date(session.metadata.endDate),
        totalPaid: Number(session.metadata.totalPaid),
        guests: Number(session.metadata.guests),
      },
    })
  }
  return new NextResponse(JSON.stringify({ received: true }), { status: 200 })
}
