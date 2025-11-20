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

    const now = new Date()
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    const last5Minutes = new Date(now.getTime() - 5 * 60 * 1000).toISOString()

    // Get unique visitors in last 24 hours
    const visitors24hResult = await turso.execute({
      sql: `SELECT COUNT(DISTINCT session_id) as count
            FROM pageviews
            WHERE timestamp > ? AND session_id != ''`,
      args: [last24Hours]
    })
    const visitors24h = Number(visitors24hResult.rows[0]?.count || 0)

    // Get active users (sessions with activity in last 5 minutes)
    const activeUsersResult = await turso.execute({
      sql: `SELECT COUNT(DISTINCT session_id) as count
            FROM pageviews
            WHERE timestamp > ? AND session_id != ''`,
      args: [last5Minutes]
    })
    const activeUsers = Number(activeUsersResult.rows[0]?.count || 0)

    // Get total page views in last 24 hours
    const pageviews24hResult = await turso.execute({
      sql: `SELECT COUNT(*) as count
            FROM pageviews
            WHERE timestamp > ?`,
      args: [last24Hours]
    })
    const pageviews24h = Number(pageviews24hResult.rows[0]?.count || 0)

    // Get most popular templates (last 7 days)
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const popularTemplatesResult = await turso.execute({
      sql: `SELECT template_slug, COUNT(*) as view_count
            FROM template_views
            WHERE timestamp > ?
            GROUP BY template_slug
            ORDER BY view_count DESC
            LIMIT 5`,
      args: [last7Days]
    })

    const popularTemplates = popularTemplatesResult.rows.map(row => ({
      slug: row.template_slug as string,
      views: Number(row.view_count)
    }))

    return NextResponse.json({
      visitors24h,
      activeUsers,
      pageviews24h,
      popularTemplates
    })
  } catch (error) {
    console.error('Error fetching analytics stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
