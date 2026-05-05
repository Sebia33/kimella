import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { InquiryModel } from '@/lib/models/Inquiry';

export async function GET() {
  try {
    const conn = await dbConnect();
    if (!conn) {
      return NextResponse.json([]); // Mock empty array
    }

    const inquiries = await InquiryModel.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error(error);
    return NextResponse.json([]); // Empty array on error for frontend safety
  }
}

export async function POST(request: NextRequest) {
  // For admin mark status - but use PUT /inquiries/[id]
  return NextResponse.json({ error: 'Use PUT /inquiries/[id]' }, { status: 405 });
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { ids } = await request.json();

    await InquiryModel.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

