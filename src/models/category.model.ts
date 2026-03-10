import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

export interface Category extends Document {
  name: string;
  description: string;
  icon: string;
}

const CategorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;
