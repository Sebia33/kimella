import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { UserModel } from '@/lib/models/User';
import { ProjectModel } from '@/lib/models/Project';
import { hashPassword } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    await dbConnect();

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await UserModel.findOneAndUpdate(
      { email: 'admin@kimella.com' },
      { 
        email: 'admin@kimella.com',
        password: hashedPassword,
        role: 'ADMIN'
      },
      { upsert: true }
    );

    // Sample projects
    const sampleProjects = [
      {
        title: 'Cape Town Luxury Villa',
        slug: 'cape-town-villa',
        description: 'Premium marble and gold accents transformation.',
        category: 'luxury',
        location: 'Cape Town',
        images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80'],
        featured: true,
      },
      {
        title: 'Modern Apartment',
        slug: 'modern-apartment',
        description: 'Urban living space planning.',
        category: 'residential',
        location: 'Johannesburg',
        images: ['https://images.unsplash.com/photo-1618221195710-dd1b1fd8a769?w=1000&q=80'],
        featured: true,
      },
    ];

    await ProjectModel.deleteMany({});
    await ProjectModel.insertMany(sampleProjects);

    return NextResponse.json({ success: true, message: 'Admin user + sample projects seeded!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'POST /api/seed to create admin + samples' });
}

