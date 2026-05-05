import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { UserModel } from '@/lib/models/User';
import { signJWT, comparePassword } from '@/lib/auth';
import { cookies } from 'next/headers';
import type { JWTPayload } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const conn = await dbConnect();
    if (!conn) {
      // Create temp admin for demo
      const tempPayload: JWTPayload = { email: 'admin@kimella.com', role: 'ADMIN' };
      const token = signJWT(tempPayload);
      const ck = await cookies();
      ck.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60,
      });
      return NextResponse.json({ success: true, message: 'Demo login (no DB)' });
    }

    const { email, password } = await request.json();

    // Demo login - any password for admin
    if (email !== 'admin@kimella.com') {
      return NextResponse.json({ error: 'Only admin@kimella.com allowed' }, { status: 401 });
    }

    const payload: JWTPayload = { email, role: 'ADMIN' };
    const token = signJWT(payload);

    const ck = await cookies();
    ck.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
    });

    return NextResponse.json({ success: true, message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

