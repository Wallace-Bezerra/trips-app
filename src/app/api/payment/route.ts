import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { authOptions } from '../auth/[...nextauth]/route'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})
export async function POST(request: NextRequest) {
  const userSession = await getServerSession(authOptions)
  console.log(userSession)
  if (!userSession?.user.id) {
    return new NextResponse(
      JSON.stringify({ error: { code: 'NOT_FOUND_USER_SESSION' } }),
      {
        status: 401,
      },
    )
  }
  const req = await request.json()
  console.log(req)
  const {
    tripId,
    name,
    description,
    coverImage,
    totalPaid,
    startDate,
    endDate,
    guests,
  } = req
  // criar checkout
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.HOST_URL}/trips/payment/success`,
    metadata: {
      tripId,
      guests,
      startDate,
      totalPaid,
      endDate,
      userId: userSession.user.id,
    },
    line_items: [
      {
        price_data: {
          currency: 'brl',
          unit_amount: totalPaid * 100,
          product_data: {
            name,
            description,
            images: [coverImage],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  })
  return new NextResponse(JSON.stringify({ sessionId: session.id }), {
    status: 200,
  })
}
