import z from 'zod';

export const categorySchema = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const updateCategorySchema = categorySchema.partial();

export type CategoryDTO = z.infer<typeof categorySchema>;

export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;
