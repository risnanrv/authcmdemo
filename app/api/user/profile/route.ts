import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
import User from '@/models/User';
import { auth } from '@/auth';

export const runtime = 'nodejs';

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, image } = await request.json();
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    await connectToDB();

    // Split name into firstName and lastName
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    const updateData: { firstName: string; lastName: string; image?: string } = {
      firstName,
      lastName,
    };

    // Only update image if it's provided and is a valid data URL
    if (image && image.startsWith('data:image')) {
      updateData.image = image;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return complete user data
    return NextResponse.json({
      id: updatedUser._id.toString(),
      name: `${updatedUser.firstName} ${updatedUser.lastName}`.trim(),
      email: updatedUser.email,
      image: updatedUser.image || null,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 