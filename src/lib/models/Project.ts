import mongoose, { Schema, models, model } from 'mongoose';

export interface Project {
  title: string;
  slug: string;
  description: string;
  category: 'residential' | 'commercial' | 'luxury';
  location: string;
  images: string[];
  beforeAfter?: { before: string[]; after: string[] };
  featured: boolean;
  materials?: string[];
  createdAt: Date;
}

const projectSchema = new Schema<Project, mongoose.Model<Project>>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['residential', 'commercial', 'luxury'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  beforeAfter: {
    before: [String],
    after: [String],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  materials: [String],
}, {
  timestamps: true,
});

export const ProjectModel = models.Project || model<Project>('Project', projectSchema);

