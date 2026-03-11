import mongoose, { Document, Schema, Types } from 'mongoose';

export interface Location {
  region: number;
  coordinates: number[];
  address: string;
}

export interface Event extends Document {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  banner: string;
  isFeatured: boolean;
  isOnline: boolean;
  isPublish: boolean;
  category: Types.ObjectId;
  slug?: string;
  createdBy: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
  location: Location;
}

const EventSchema = new Schema<Event>(
  {
    name: {
      type: Schema.Types.String,
      trim: true,
      required: true,
    },
    startDate: {
      type: Schema.Types.String,
      required: true,
    },
    endDate: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    banner: {
      type: Schema.Types.String,
      required: true,
    },
    isFeatured: {
      type: Schema.Types.Boolean,
      required: true,
    },
    isOnline: {
      type: Schema.Types.Boolean,
      required: true,
    },
    isPublish: {
      type: Schema.Types.Boolean,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    slug: {
      type: Schema.Types.String,
      unique: true,
    },
    location: {
      region: {
        type: Schema.Types.Number,
      },
      coordinates: {
        type: [Schema.Types.Number],
        default: [0, 0],
      },
      address: {
        type: Schema.Types.String,
      },
    },
  },
  {
    timestamps: true,
  }
).index({ name: 'text' });

EventSchema.pre('save', function () {
  if (!this.slug) {
    this.slug = this.name.split(' ').join('-').toLowerCase();
  }
});

const EventModel = mongoose.model('Event', EventSchema);

export default EventModel;
