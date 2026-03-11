import z from 'zod';

export const locationSchema = z.object({
  region: z.number(),
  coordinates: z.array(z.number()),
  address: z.string(),
});

export const eventSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
  banner: z.string(),
  isFeatured: z.boolean(),
  isOnline: z.boolean(),
  isPublish: z.boolean(),
  category: z.string(),
  slug: z.string(),
  createdBy: z.string(),
  location: locationSchema,
});

export const updateEventSchema = eventSchema.partial();

export type EventInput = z.infer<typeof eventSchema>;
export type LocationInput = z.infer<typeof locationSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
