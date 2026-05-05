import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { InquiryModel } from '@/lib/models/Inquiry';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const { status } = await request.json();

    const inquiry = await InquiryModel.findByIdAndUpdate(params.id, { status }, { new: true }).lean();

    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

