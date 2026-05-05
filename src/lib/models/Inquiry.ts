import mongoose, { Schema, models, model } from 'mongoose';

export interface Inquiry {
  name: string;
  email: string;
  phone: string;
  budget: string;
  projectType: string;
  message: string;
  status: 'new' | 'in-progress' | 'completed';
  createdAt: Date;
}

const inquirySchema = new Schema<Inquiry, mongoose.Model<Inquiry>>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'completed'],
    default: 'new',
  },
}, {
  timestamps: true,
});

export const InquiryModel = models.Inquiry || model<Inquiry>('Inquiry', inquirySchema);

