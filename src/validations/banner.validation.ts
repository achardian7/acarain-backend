import z from 'zod';

export const bannerSchema = z.object({
  title: z.string(),
  image: z.string(),
  isShow: z.boolean(),
});

export const updateBannerSchema = bannerSchema.partial();

export type BannerDTO = z.infer<typeof bannerSchema>;
export type UpdateBannerDTO = z.infer<typeof updateBannerSchema>;
