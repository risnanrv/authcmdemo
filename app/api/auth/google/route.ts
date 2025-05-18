import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email, name, image } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDB();

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Split name into firstName and lastName
      const nameParts = name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';

      // Generate a secure random password
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      // Create new user
      user = await User.create({
        email,
        firstName,
        lastName,
        image,
        password: hashedPassword,
      });

      if (!user) {
        throw new Error('Failed to create user');
      }
    }

    return NextResponse.json({
      id: user._id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      image: user.image || null,
    });
  } catch (error) {
    console.error('Google sign-in error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 