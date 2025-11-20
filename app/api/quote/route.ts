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
    const {
      websiteType,
      numPages,
      selectedFeatures,
      name,
      email,
      phone,
      calculated_price
    } = body

    // Validation
    if (!name || !email || !websiteType) {
      return NextResponse.json(
        { error: 'Name, email, and website type are required' },
        { status: 400 }
      )
    }

    const id = `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const created_at = new Date().toISOString()

    // Convert selectedFeatures array to JSON string
    const featuresJson = JSON.stringify(selectedFeatures || [])

    // Insert into database
    await turso.execute({
      sql: `INSERT INTO quote_requests
            (id, customer_name, customer_email, customer_phone, website_type,
             num_pages, features, calculated_price, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
      args: [
        id,
        name,
        email,
        phone || '',
        websiteType,
        numPages || '',
        featuresJson,
        calculated_price || 0,
        created_at
      ]
    })

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to customer

    return NextResponse.json({
      success: true,
      message: 'Quote request received successfully',
      id,
      calculated_price
    })
  } catch (error) {
    console.error('Error saving quote request:', error)
    return NextResponse.json(
      { error: 'Failed to save quote request' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve quote requests (for admin)
export async function GET(request: NextRequest) {
  try {
    await ensureInitialized()

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = 'SELECT * FROM quote_requests'
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

    // Parse features JSON for each row
    const quotes = result.rows.map(row => ({
      ...row,
      features: row.features ? JSON.parse(row.features as string) : []
    }))

    return NextResponse.json({
      quotes,
      total: quotes.length
    })
  } catch (error) {
    console.error('Error fetching quote requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quote requests' },
      { status: 500 }
    )
  }
}
