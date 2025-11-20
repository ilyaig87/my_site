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

    // Analytics: Page views tracking
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS pageviews (
        id TEXT PRIMARY KEY,
        page_path TEXT NOT NULL,
        referrer TEXT,
        user_agent TEXT,
        ip_address TEXT,
        session_id TEXT,
        timestamp TEXT NOT NULL,
        duration_seconds INTEGER
      )
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_pageviews_timestamp ON pageviews(timestamp DESC)
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_pageviews_session ON pageviews(session_id)
    `)

    // Analytics: Template views tracking
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS template_views (
        id TEXT PRIMARY KEY,
        template_slug TEXT NOT NULL,
        view_type TEXT,
        session_id TEXT,
        timestamp TEXT NOT NULL
      )
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_template_views_slug ON template_views(template_slug)
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_template_views_timestamp ON template_views(timestamp DESC)
    `)

    // Analytics: Session analytics
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS session_analytics (
        id TEXT PRIMARY KEY,
        session_id TEXT UNIQUE NOT NULL,
        first_page TEXT,
        last_page TEXT,
        total_pageviews INTEGER DEFAULT 0,
        started_at TEXT NOT NULL,
        last_activity TEXT NOT NULL,
        ended_at TEXT,
        ip_address TEXT,
        user_agent TEXT
      )
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_sessions_started ON session_analytics(started_at DESC)
    `)

    // Lead Management: Contact submissions
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        source_page TEXT,
        status TEXT DEFAULT 'new',
        assigned_to TEXT,
        notes TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT
      )
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status)
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC)
    `)

    // Lead Management: Quote requests
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS quote_requests (
        id TEXT PRIMARY KEY,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT,
        website_type TEXT,
        num_pages INTEGER,
        features TEXT,
        budget_range TEXT,
        timeline TEXT,
        calculated_price INTEGER,
        status TEXT DEFAULT 'pending',
        created_at TEXT NOT NULL
      )
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_quote_created ON quote_requests(created_at DESC)
    `)

    // Chat: Sessions
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id TEXT PRIMARY KEY,
        session_id TEXT UNIQUE NOT NULL,
        user_ip TEXT,
        user_email TEXT,
        started_at TEXT NOT NULL,
        ended_at TEXT,
        lead_captured INTEGER DEFAULT 0
      )
    `)

    // Chat: Messages
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        message_text TEXT NOT NULL,
        sender TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (session_id) REFERENCES chat_sessions(session_id)
      )
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id, timestamp)
    `)

    // Email: Queue system
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS email_queue (
        id TEXT PRIMARY KEY,
        recipient_email TEXT NOT NULL,
        subject TEXT NOT NULL,
        body TEXT NOT NULL,
        email_type TEXT,
        status TEXT DEFAULT 'pending',
        sent_at TEXT,
        error_message TEXT,
        created_at TEXT NOT NULL
      )
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_email_status ON email_queue(status)
    `)

    // Newsletter: Subscribers
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        subscribed_at TEXT NOT NULL,
        unsubscribed_at TEXT,
        status TEXT DEFAULT 'active'
      )
    `)

    // Conversion: Special offers
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS special_offers (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        discount_percent INTEGER,
        discount_amount INTEGER,
        package_ids TEXT,
        starts_at TEXT NOT NULL,
        ends_at TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        created_at TEXT NOT NULL
      )
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_offers_dates ON special_offers(starts_at, ends_at)
    `)

    // Conversion: Abandoned checkouts
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS abandoned_checkouts (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        package_id TEXT NOT NULL,
        package_name TEXT NOT NULL,
        customer_email TEXT,
        customer_name TEXT,
        amount INTEGER,
        abandoned_at TEXT NOT NULL,
        recovered INTEGER DEFAULT 0
      )
    `)

    await turso.execute(`
      CREATE INDEX IF NOT EXISTS idx_abandoned_at ON abandoned_checkouts(abandoned_at DESC)
    `)

    // Update reviews table to add approval field
    // Note: SQLite doesn't support ALTER TABLE ADD COLUMN IF NOT EXISTS directly
    // We'll handle this gracefully by catching errors
    try {
      await turso.execute(`
        ALTER TABLE reviews ADD COLUMN approved INTEGER DEFAULT 1
      `)
    } catch (e) {
      // Column might already exist, ignore error
      console.log('Reviews table already has approved column or other alter error')
    }

    console.log('✅ Turso database initialized with all tables')
  } catch (error) {
    console.error('❌ Error initializing database:', error)
  }
}
