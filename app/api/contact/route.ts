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
    const { name, email, phone, message, source_page } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    const id = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const created_at = new Date().toISOString()

    // Insert into database
    await turso.execute({
      sql: `INSERT INTO contact_submissions
            (id, name, email, phone, message, source_page, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, 'new', ?)`,
      args: [id, name, email, phone || '', message, source_page || '/contact', created_at]
    })

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user

    return NextResponse.json({
      success: true,
      message: 'Contact submission received successfully',
      id
    })
  } catch (error) {
    console.error('Error saving contact submission:', error)
    return NextResponse.json(
      { error: 'Failed to save contact submission' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve contact submissions (for admin)
export async function GET(request: NextRequest) {
  try {
    await ensureInitialized()

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = 'SELECT * FROM contact_submissions'
    const args: any[] = []

    if (status) {
      query += ' WHERE status = ?'
      args.push(status)
    }

    query += ' ORDER BY created_at DESC LIMIT ?'
    args.push(limit)

    const result = await turso.execute({
      sql: query,
      args
    })

    return NextResponse.json({
      submissions: result.rows,
      total: result.rows.length
    })
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact submissions' },
      { status: 500 }
    )
  }
}
