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
    const { reviewId, approved } = body

    if (!reviewId) {
      return NextResponse.json(
        { error: 'reviewId is required' },
        { status: 400 }
      )
    }

    // Update review approval status
    await turso.execute({
      sql: 'UPDATE reviews SET approved = ? WHERE id = ?',
      args: [approved ? 1 : 0, reviewId]
    })

    return NextResponse.json({
      success: true,
      message: `Review ${approved ? 'approved' : 'unapproved'} successfully`
    })
  } catch (error) {
    console.error('Error moderating review:', error)
    return NextResponse.json(
      { error: 'Failed to moderate review' },
      { status: 500 }
    )
  }
}
