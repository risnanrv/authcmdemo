import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';

export const runtime = 'nodejs';

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { password } = await request.json();

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    await connectToDB();
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.updateOne(
      { email: session.user.email },
      { $set: { password: hashedPassword } }
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({ message: 'Password updated successfully' });
    } else {
      return NextResponse.json(
        { error: 'User not found or password unchanged' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
