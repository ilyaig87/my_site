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
    const template_slug = searchParams.get('slug')

    if (!template_slug) {
      return NextResponse.json(
        { error: 'slug parameter is required' },
        { status: 400 }
      )
    }

    const now = new Date()
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

    // Get total views for this template
    const totalViewsResult = await turso.execute({
      sql: `SELECT COUNT(*) as count FROM template_views WHERE template_slug = ?`,
      args: [template_slug]
    })
    const totalViews = Number(totalViewsResult.rows[0]?.count || 0)

    // Get views in last 30 days
    const views30dResult = await turso.execute({
      sql: `SELECT COUNT(*) as count FROM template_views
            WHERE template_slug = ? AND timestamp > ?`,
      args: [template_slug, last30Days]
    })
    const views30d = Number(views30dResult.rows[0]?.count || 0)

    // Get views in last 7 days
    const views7dResult = await turso.execute({
      sql: `SELECT COUNT(*) as count FROM template_views
            WHERE template_slug = ? AND timestamp > ?`,
      args: [template_slug, last7Days]
    })
    const views7d = Number(views7dResult.rows[0]?.count || 0)

    // Get rank among all templates (last 30 days)
    const rankResult = await turso.execute({
      sql: `SELECT COUNT(DISTINCT template_slug) + 1 as rank
            FROM template_views
            WHERE timestamp > ?
            GROUP BY template_slug
            HAVING COUNT(*) > (
              SELECT COUNT(*) FROM template_views
              WHERE template_slug = ? AND timestamp > ?
            )`,
      args: [last30Days, template_slug, last30Days]
    })
    const rank = Number(rankResult.rows[0]?.rank || 999)

    return NextResponse.json({
      template_slug,
      totalViews,
      views30d,
      views7d,
      rank,
      isPopular: rank <= 3 // Top 3 templates are marked as popular
    })
  } catch (error) {
    console.error('Error fetching template stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch template stats' },
      { status: 500 }
    )
  }
}
