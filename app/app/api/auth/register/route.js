import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createUser, findUserByEmail } from '@/lib/users';
import { signJWT, cookieOptions, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists. Please sign in.' }, { status: 409 });
    }

    const newUser = await createUser({
      name,
      email,
      password,
      avatar: '/user-deepak.jpg',
    });

    // Generate JWT token
    const token = await signJWT({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
    });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, cookieOptions);

    return NextResponse.json(
      {
        message: 'Account created successfully!',
        user: newUser,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong during registration.' },
      { status: 500 }
    );
  }
}
