import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { turso } from '@/lib/turso'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user in database
    const result = await turso.execute({
      sql: 'SELECT * FROM admin_users WHERE email = ? AND is_active = 1',
      args: [email]
    })

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const user = result.rows[0]
    const passwordHash = user.password_hash as string

    // Verify password
    const isValidPassword = await bcrypt.compare(password, passwordHash)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Update last login
    await turso.execute({
      sql: 'UPDATE admin_users SET last_login = ? WHERE id = ?',
      args: [new Date().toISOString(), user.id]
    })

    // Set secure HTTP-only cookie with user ID
    const cookieStore = await cookies()
    cookieStore.set('admin_auth', user.id as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Error in admin auth:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

// Logout endpoint
export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_auth')

  return NextResponse.json({ success: true })
}

// Check auth status
export async function GET() {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('admin_auth')

    if (!authCookie?.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Verify user still exists and is active
    const result = await turso.execute({
      sql: 'SELECT id, email, name, role FROM admin_users WHERE id = ? AND is_active = 1',
      args: [authCookie.value]
    })

    if (result.rows.length === 0) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      user: result.rows[0]
    })
  } catch (error) {
    console.error('Error checking auth status:', error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
