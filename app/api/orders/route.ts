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

export async function GET(request: NextRequest) {
  try {
    await ensureInitialized()

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '100')

    let query = 'SELECT * FROM orders'
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
      orders: result.rows,
      total: result.rows.length
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
