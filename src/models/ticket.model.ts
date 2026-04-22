import mongoose, { Schema, Types } from 'mongoose';
import { Document } from 'mongoose';

import { EVENT_MODEL_NAME } from './event.model';

export const TICKET_MODEL_NAME = 'Ticket';

export interface Ticket extends Document {
  price: number;
  name: string;
  events: Types.ObjectId;
  description: string;
  quantity: number;
}

const TicketSchema = new Schema<Ticket>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    quantity: {
      type: Schema.Types.Number,
      required: true,
    },
    events: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: EVENT_MODEL_NAME,
    },
  },
  {
    timestamps: true,
  }
).index({ name: 'text' });

const TicketModel = mongoose.model(TICKET_MODEL_NAME, TicketSchema);

export default TicketModel;
