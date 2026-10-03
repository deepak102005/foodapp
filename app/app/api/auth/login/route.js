import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { findUserByEmail } from '@/lib/users';
import { comparePassword, signJWT, cookieOptions, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are both required.' },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || '/user-deepak.jpg',
    };

    // Generate JWT token
    const token = await signJWT(safeUser);

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, cookieOptions);

    return NextResponse.json(
      {
        message: 'Logged in successfully!',
        user: safeUser,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
