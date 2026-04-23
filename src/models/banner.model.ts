import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

export const BANNER_MODEL_NAME = 'Banner';

export interface Banner extends Document {
  title: string;
  image: string;
  isShow: boolean;
}

const BannerSchema = new Schema<Banner>(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    image: {
      type: Schema.Types.String,
      required: true,
    },
    isShow: {
      type: Schema.Types.Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
).index({ title: 'text' });

const BannerModel = mongoose.model(BANNER_MODEL_NAME, BannerSchema);

export default BannerModel;
