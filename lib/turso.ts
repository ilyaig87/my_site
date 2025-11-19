import { createClient } from '@libsql/client'

// Create Turso client
export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN || '',
})

// Initialize database schema
export async function initDatabase() {
  try {
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

    // Create index for faster queries
    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_reviews_date ON reviews(date DESC)
    `)

    console.log('✅ Turso database initialized')
  } catch (error) {
    console.error('❌ Error initializing database:', error)
  }
}
