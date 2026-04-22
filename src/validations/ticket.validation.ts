import { Types } from 'mongoose';
import z from 'zod';

export const ticketSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
  events: z.union([z.string(), z.instanceof(Types.ObjectId)]),
});

export const updateTicketSchema = ticketSchema.partial();

export type TicketDTO = z.infer<typeof ticketSchema>;
export type UpdateTicketDTO = z.infer<typeof updateTicketSchema>;
