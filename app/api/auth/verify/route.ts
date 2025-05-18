import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs'; // This ensures the route runs in Node.js environment

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      id: user._id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      image: user.image || null,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 