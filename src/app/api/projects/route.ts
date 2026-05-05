import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { ProjectModel } from '@/lib/models/Project';

export async function GET(request: NextRequest) {
  try {
    const conn = await dbConnect();
    if (!conn) {
      // Mock projects for demo
      const mockProjects = [
        // Luxury
        {
          _id: '1',
          title: 'Cape Town Luxury Villa',
          slug: 'cape-town-villa',
          description: 'Complete transformation with premium marble and gold accents.',
          category: 'luxury',
          location: 'Cape Town',
          images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600566752355-35798f7f8ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600607687646-2e57d16a11e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          ],
          featured: true,
        },
        {
          _id: '2',
          title: 'Johannesburg Penthouse',
          slug: 'jhb-penthouse',
          description: 'Panoramic views with bespoke furniture design.',
          category: 'luxury',
          location: 'Johannesburg',
          images: [
            'https://images.unsplash.com/photo-1558618047-7f4f49490d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1571896349841-3b6339b1d00d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          ],
          featured: false,
        },
        // Residential
        {
          _id: '3',
          title: 'Modern Family Apartment',
          slug: 'modern-apartment',
          description: 'Space planning and furniture styling for urban living.',
          category: 'residential',
          location: 'Johannesburg',
          images: [
            'https://images.unsplash.com/photo-1618221195710-dd1b1fd8a769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1449844908444-921acfb5b325?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          ],
          featured: true,
        },
        {
          _id: '4',
          title: 'Coastal Residence',
          slug: 'coastal-residence',
          description: 'Beach house with natural materials and open spaces.',
          category: 'residential',
          location: 'Durban',
          images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          ],
          featured: false,
        },
        // Commercial
        {
          _id: '5',
          title: 'Nairobi Corporate Office',
          slug: 'nairobi-office',
          description: 'Corporate office renovation with 3D visualization.',
          category: 'commercial',
          location: 'Nairobi',
          images: [
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          ],
          featured: false,
        },
        {
          _id: '6',
          title: 'Retail Showroom',
          slug: 'retail-showroom',
          description: 'High-end furniture showroom design.',
          category: 'commercial',
          location: 'Lagos',
          images: [
            'https://images.unsplash.com/photo-1558618048-6f20500e2848?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          ],
          featured: true,
        },
      ];

      const { searchParams } = new URL(request.url);
      const featuredParam = searchParams.get('featured') === 'true';
      const categoryParam = searchParams.get('category') || 'all';

      // Filter mock
      const featuredMock = mockProjects.filter(p => p.featured);
      const categoryMock = mockProjects.filter(p => categoryParam === 'all' || p.category === categoryParam);
      const filtered = categoryParam === 'all' ? featuredMock : categoryMock;

      return NextResponse.json(filtered);
    }

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const category = searchParams.get('category') || 'all';

    const query: any = {};
    if (featured) query.featured = true;
    if (category !== 'all') query.category = category;

    const projects = await ProjectModel.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json([]); // fallback to empty
  }
}

export async function POST(request: NextRequest) {
  try {
    const conn = await dbConnect();
    if (!conn) {
      return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
    }

    const { title, slug, description, category, location, images, featured = false } = await request.json();

    const project = new ProjectModel({
      title,
      slug,
      description,
      category,
      location,
      images,
      featured,
    });

    await project.save();

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

