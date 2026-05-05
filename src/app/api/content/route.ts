import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { ContentModel } from '@/lib/models/Content';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 'home';

    const conn = await dbConnect();
    if (!conn) {
      return NextResponse.json({ data: {
        homeTagline: "Designing spaces that feel like home",
        homeCTA1: "View Projects",
        homeCTA2: "Request Quote",
        aboutStory: "",
        designPhilosophy: "",
        services: []
      } });
    }

    try {
      const content = await ContentModel.findOne({ page });
      return NextResponse.json(content || { data: {
        homeTagline: "Designing spaces that feel like home",
        homeCTA1: "View Projects",
        homeCTA2: "Request Quote",
        aboutStory: "",
        designPhilosophy: "",
        services: []
      } });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ data: {
        homeTagline: "Designing spaces that feel like home",
        homeCTA1: "View Projects",
        homeCTA2: "Request Quote",
        aboutStory: "",
        designPhilosophy: "",
        services: []
      } });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: {
      homeTagline: "Designing spaces that feel like home",
      homeCTA1: "View Projects",
      homeCTA2: "Request Quote",
      aboutStory: "",
      designPhilosophy: "",
      services: []
    } }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { page, data } = await request.json();

    let content = await ContentModel.findOne({ page });
    if (content) {
      content.data = data;
      await content.save();
    } else {
      content = new ContentModel({ page, data });
      await content.save();
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

