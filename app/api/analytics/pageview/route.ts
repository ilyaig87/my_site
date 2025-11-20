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
    const { page_path, referrer, session_id } = body

    if (!page_path) {
      return NextResponse.json(
        { error: 'page_path is required' },
        { status: 400 }
      )
    }

    // Get user info from request
    const user_agent = request.headers.get('user-agent') || ''
    const ip_address = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'unknown'

    const timestamp = new Date().toISOString()
    const id = `pv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Insert pageview
    await turso.execute({
      sql: `INSERT INTO pageviews (id, page_path, referrer, user_agent, ip_address, session_id, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [id, page_path, referrer || '', user_agent, ip_address, session_id || '', timestamp]
    })

    // Update or create session analytics
    if (session_id) {
      // Check if session exists
      const sessionResult = await turso.execute({
        sql: 'SELECT * FROM session_analytics WHERE session_id = ?',
        args: [session_id]
      })

      if (sessionResult.rows.length === 0) {
        // Create new session
        const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        await turso.execute({
          sql: `INSERT INTO session_analytics
                (id, session_id, first_page, last_page, total_pageviews, started_at, last_activity, ip_address, user_agent)
                VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?)`,
          args: [sessionId, session_id, page_path, page_path, timestamp, timestamp, ip_address, user_agent]
        })
      } else {
        // Update existing session
        await turso.execute({
          sql: `UPDATE session_analytics
                SET last_page = ?,
                    total_pageviews = total_pageviews + 1,
                    last_activity = ?
                WHERE session_id = ?`,
          args: [page_path, timestamp, session_id]
        })
      }
    }

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error tracking pageview:', error)
    return NextResponse.json(
      { error: 'Failed to track pageview' },
      { status: 500 }
    )
  }
}
