import { NextRequest, NextResponse } from 'next/server'
import { turso, initDatabase } from '@/lib/turso'

// Initialize database on first request
let isInitialized = false
async function ensureInitialized() {
  if (!isInitialized) {
    await initDatabase()
    isInitialized = true
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureInitialized()

    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const id = `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const subscribed_at = new Date().toISOString()

    // Check if already subscribed
    const existing = await turso.execute({
      sql: 'SELECT * FROM newsletter_subscribers WHERE email = ?',
      args: [email]
    })

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'האימייל כבר רשום לניוזלטר' },
        { status: 400 }
      )
    }

    // Insert new subscriber
    await turso.execute({
      sql: `INSERT INTO newsletter_subscribers (id, email, name, subscribed_at, status)
            VALUES (?, ?, ?, ?, 'active')`,
      args: [id, email, name || '', subscribed_at]
    })

    // TODO: Send welcome email
    // TODO: Add to email marketing service (Mailchimp, SendGrid, etc.)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      id
    })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

// GET endpoint for admin to view subscribers
export async function GET(request: NextRequest) {
  try {
    await ensureInitialized()

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '1000')

    let query = 'SELECT * FROM newsletter_subscribers'
    const args: any[] = []

    if (status) {
      query += ' WHERE status = ?'
      args.push(status)
    }

    query += ' ORDER BY subscribed_at DESC LIMIT ?'
    args.push(limit)

    const result = await turso.execute({
      sql: query,
      args
    })

    return NextResponse.json({
      subscribers: result.rows,
      total: result.rows.length
    })
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}
