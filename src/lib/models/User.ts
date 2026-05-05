import mongoose, { Schema, models, model } from 'mongoose';

export interface User {
  email: string;
  password: string;
  role: 'ADMIN';
}

const userSchema = new Schema<User, mongoose.Model<User>>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'ADMIN',
  },
}, {
  timestamps: true,
});

export const UserModel = models.User || model<User>('User', userSchema);

