import { NextRequest, NextResponse } from 'next/server'
import { turso, initDatabase } from '@/lib/turso'

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  approved: number
  created_at: number
}

// Initialize database on first request
let isInitialized = false
async function ensureInitialized() {
  if (!isInitialized) {
    await initDatabase()
    isInitialized = true
  }
}

// GET - Get all reviews
export async function GET(request: NextRequest) {
  try {
    await ensureInitialized()

    const searchParams = request.nextUrl.searchParams
    const includeUnapproved = searchParams.get('admin') === 'true'

    let query = `SELECT id, name, rating, comment, date, approved, created_at FROM reviews`

    // For public API, only show approved reviews
    if (!includeUnapproved) {
      query += ` WHERE approved = 1`
    }

    query += ` ORDER BY date DESC`

    const result = await turso.execute(query)

    const reviews: Review[] = result.rows.map(row => ({
      id: row.id as string,
      name: row.name as string,
      rating: row.rating as number,
      comment: row.comment as string,
      date: row.date as string,
      approved: row.approved as number,
      created_at: row.created_at as number
    }))

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('Error reading reviews:', error)
    return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 })
  }
}

// POST - Add new review
export async function POST(request: NextRequest) {
  try {
    await ensureInitialized()

    const body = await request.json()

    // Validate input
    if (!body.name || !body.rating || !body.comment) {
      return NextResponse.json(
        { error: 'Name, rating and comment are required' },
        { status: 400 }
      )
    }

    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Create new review
    const newReview: Review = {
      id: Date.now().toString(),
      name: body.name.trim(),
      rating: Number(body.rating),
      comment: body.comment.trim(),
      date: new Date().toISOString()
    }

    // Insert into database
    await turso.execute({
      sql: `
        INSERT INTO reviews (id, name, rating, comment, date)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [
        newReview.id,
        newReview.name,
        newReview.rating,
        newReview.comment,
        newReview.date
      ]
    })

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error('Error saving review:', error)
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 })
  }
}

// DELETE - Delete a review
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      )
    }

    await turso.execute({
      sql: 'DELETE FROM reviews WHERE id = ?',
      args: [id]
    })

    return NextResponse.json({ success: true, message: 'Review deleted successfully' })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}
