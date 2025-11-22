import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { turso } from '@/lib/turso'

// Helper function to check admin auth
async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin_auth')

  if (!authCookie?.value) {
    return false
  }

  // Verify user exists and is active
  const result = await turso.execute({
    sql: 'SELECT id FROM admin_users WHERE id = ? AND is_active = 1',
    args: [authCookie.value]
  })

  return result.rows.length > 0
}

// GET all packages
export async function GET() {
  try {
    const result = await turso.execute(`
      SELECT * FROM pricing_packages
      WHERE is_active = 1
      ORDER BY display_order ASC, price ASC
    `)

    const packages = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      price: row.price,
      currency: row.currency,
      description: row.description,
      features: JSON.parse(row.features as string),
      popular: row.is_popular === 1,
      displayOrder: row.display_order,
    }))

    return NextResponse.json({ packages })
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}

// POST - Create new package (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, price, currency, description, features, popular, displayOrder } = body

    if (!name || !price || !features) {
      return NextResponse.json(
        { error: 'Name, price, and features are required' },
        { status: 400 }
      )
    }

    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await turso.execute({
      sql: `INSERT INTO pricing_packages
            (id, name, price, currency, description, features, is_popular, display_order, is_active, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      args: [
        id,
        name,
        price,
        currency || 'ILS',
        description || '',
        JSON.stringify(features),
        popular ? 1 : 0,
        displayOrder || 0,
        now
      ]
    })

    return NextResponse.json({
      success: true,
      id
    })
  } catch (error) {
    console.error('Error creating package:', error)
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    )
  }
}

// PUT - Update package (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Check admin authentication
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, name, price, currency, description, features, popular, displayOrder } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()

    await turso.execute({
      sql: `UPDATE pricing_packages
            SET name = ?, price = ?, currency = ?, description = ?,
                features = ?, is_popular = ?, display_order = ?, updated_at = ?
            WHERE id = ?`,
      args: [
        name,
        price,
        currency || 'ILS',
        description || '',
        JSON.stringify(features),
        popular ? 1 : 0,
        displayOrder || 0,
        now,
        id
      ]
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating package:', error)
    return NextResponse.json(
      { error: 'Failed to update package' },
      { status: 500 }
    )
  }
}

// DELETE - Soft delete package (admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Check admin authentication
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      )
    }

    await turso.execute({
      sql: 'UPDATE pricing_packages SET is_active = 0 WHERE id = ?',
      args: [id]
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting package:', error)
    return NextResponse.json(
      { error: 'Failed to delete package' },
      { status: 500 }
    )
  }
}
