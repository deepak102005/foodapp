import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT, AUTH_COOKIE_NAME } from '@/lib/auth';
import { findUserById } from '@/lib/users';

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    // Also support Authorization header
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const payload = await verifyJWT(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Verify user still exists in database
    const user = await findUserById(payload.id);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || '/user-deepak.jpg',
    };

    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
