import { NextRequest, NextResponse } from 'next/server'
import { turso } from '@/lib/turso'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    // Check if any admin users exist
    const result = await turso.execute('SELECT COUNT(*) as count FROM admin_users')
    const count = result.rows[0]?.count as number || 0

    return NextResponse.json({
      canRegister: count === 0,
      adminExists: count > 0
    })
  } catch (error) {
    console.error('Error checking admin users:', error)
    return NextResponse.json(
      { error: 'Failed to check admin status' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // First, check if any admin users already exist
    const checkResult = await turso.execute('SELECT COUNT(*) as count FROM admin_users')
    const count = checkResult.rows[0]?.count as number || 0

    if (count > 0) {
      return NextResponse.json(
        { error: 'Admin user already exists. Registration is disabled.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { email, password, name } = body

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create admin user
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await turso.execute({
      sql: `INSERT INTO admin_users (id, email, password_hash, name, role, is_active, created_at)
            VALUES (?, ?, ?, ?, 'admin', 1, ?)`,
      args: [id, email, passwordHash, name, now]
    })

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully'
    })
  } catch (error) {
    console.error('Error registering admin:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
