import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { turso } from '@/lib/turso'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { packageId, customerName, customerEmail, customerPhone } = body

    // Validate input
    if (!packageId || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Load package data
    const packages = await import('@/data/packages.json')
    const selectedPackage = packages.default.find((p: any) => p.id === packageId)

    if (!selectedPackage) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      // Demo mode - save order but don't process payment
      const orderId = Date.now().toString()

      await turso.execute({
        sql: `
          INSERT INTO orders (id, package_id, package_name, amount, currency, customer_name, customer_email, customer_phone, status, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          orderId,
          selectedPackage.id,
          selectedPackage.name,
          selectedPackage.price,
          selectedPackage.currency,
          customerName,
          customerEmail,
          customerPhone || '',
          'demo',
          new Date().toISOString()
        ]
      })

      return NextResponse.json({
        success: true,
        demo: true,
        message: 'מצב הדגמה - התשלום לא בוצע באמת. הזמנה נשמרה למעקב.',
        orderId
      })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: selectedPackage.currency.toLowerCase(),
            product_data: {
              name: selectedPackage.name,
              description: selectedPackage.description,
            },
            unit_amount: selectedPackage.price * 100, // Convert to agorot
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pricing?canceled=true`,
      customer_email: customerEmail,
      metadata: {
        packageId: selectedPackage.id,
        customerName,
        customerPhone: customerPhone || '',
      },
    })

    // Save order to database
    await turso.execute({
      sql: `
        INSERT INTO orders (id, package_id, package_name, amount, currency, customer_name, customer_email, customer_phone, status, stripe_session_id, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        session.id,
        selectedPackage.id,
        selectedPackage.name,
        selectedPackage.price,
        selectedPackage.currency,
        customerName,
        customerEmail,
        customerPhone || '',
        'pending',
        session.id,
        new Date().toISOString()
      ]
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
