import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { turso } from '@/lib/turso'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      // Update order status in database
      await turso.execute({
        sql: `
          UPDATE orders
          SET status = 'paid', paid_at = ?
          WHERE stripe_session_id = ?
        `,
        args: [new Date().toISOString(), session.id]
      })

      // Here you can also:
      // - Send confirmation email to customer
      // - Send notification to admin
      // - Trigger fulfillment process
      console.log('Payment successful for session:', session.id)
      break
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session

      await turso.execute({
        sql: `
          UPDATE orders
          SET status = 'expired'
          WHERE stripe_session_id = ?
        `,
        args: [session.id]
      })
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
