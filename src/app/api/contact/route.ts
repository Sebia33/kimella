import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { InquiryModel } from '@/lib/models/Inquiry';

export async function POST(request: NextRequest) {
  try {
    const conn = await dbConnect();
    if (!conn) {
      return NextResponse.json({ success: true, message: 'Thank you! We\'ll contact you soon.' });
    }

    const { name, email, phone, budget, projectType, message } = await request.json();

    const newInquiry = new InquiryModel({
      name,
      email,
      phone,
      budget,
      projectType,
      message,
      status: 'new',
    });

    await newInquiry.save();

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: true, message: 'Thank you! We\'ll contact you soon.' });
  }
}

