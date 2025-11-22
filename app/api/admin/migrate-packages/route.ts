import { NextResponse } from 'next/server'
import { turso } from '@/lib/turso'
import packagesData from '@/data/packages.json'

// This is a one-time migration endpoint to move packages from JSON to database
export async function POST() {
  try {
    // Check if packages already exist in DB
    const existingPackages = await turso.execute('SELECT COUNT(*) as count FROM pricing_packages')
    const count = existingPackages.rows[0]?.count as number || 0

    if (count > 0) {
      return NextResponse.json({
        message: 'Packages already migrated',
        count
      })
    }

    // Migrate packages from JSON to database
    const now = new Date().toISOString()
    let migrated = 0

    for (const pkg of packagesData) {
      await turso.execute({
        sql: `INSERT INTO pricing_packages
              (id, name, price, currency, description, features, is_popular, display_order, is_active, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
        args: [
          pkg.id,
          pkg.name,
          pkg.price,
          pkg.currency,
          pkg.description,
          JSON.stringify(pkg.features),
          pkg.popular ? 1 : 0,
          migrated,
          now
        ]
      })
      migrated++
    }

    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${migrated} packages`,
      migrated
    })
  } catch (error) {
    console.error('Error migrating packages:', error)
    return NextResponse.json(
      { error: 'Failed to migrate packages' },
      { status: 500 }
    )
  }
}
