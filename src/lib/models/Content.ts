import mongoose, { Schema, models, model } from 'mongoose';

export interface ContentData {
  homeTagline: string;
  homeCTA1: string;
  homeCTA2: string;
  aboutStory: string;
  designPhilosophy: string;
  services: string[];
}

export interface Content {
  page: 'home' | 'about' | 'services' | 'contact';
  data: ContentData;
}

const contentSchema = new Schema<Content, mongoose.Model<Content>>({
  page: {
    type: String,
    enum: ['home', 'about', 'services', 'contact'],
    required: true,
    unique: true,
  },
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

export const ContentModel = models.Content || model<Content>('Content', contentSchema);

