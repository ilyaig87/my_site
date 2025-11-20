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
    const { template_slug, view_type, session_id } = body

    if (!template_slug) {
      return NextResponse.json(
        { error: 'template_slug is required' },
        { status: 400 }
      )
    }

    const timestamp = new Date().toISOString()
    const id = `tv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    await turso.execute({
      sql: `INSERT INTO template_views (id, template_slug, view_type, session_id, timestamp)
            VALUES (?, ?, ?, ?, ?)`,
      args: [id, template_slug, view_type || 'view', session_id || '', timestamp]
    })

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error tracking template view:', error)
    return NextResponse.json(
      { error: 'Failed to track template view' },
      { status: 500 }
    )
  }
}
