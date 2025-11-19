import { createClient } from '@libsql/client'

// Create Turso client
export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN || '',
})

// Initialize database schema
export async function initDatabase() {
  try {
    // Reviews table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
        comment TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at INTEGER DEFAULT (strftime('%s', 'now'))
      )
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_reviews_date ON reviews(date DESC)
    `)

    // Orders table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        package_id TEXT NOT NULL,
        package_name TEXT NOT NULL,
        amount INTEGER NOT NULL,
        currency TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT,
        status TEXT NOT NULL,
        stripe_session_id TEXT,
        paid_at TEXT,
        created_at TEXT NOT NULL
      )
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC)
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)
    `)

    console.log('✅ Turso database initialized')
  } catch (error) {
    console.error('❌ Error initializing database:', error)
  }
}
