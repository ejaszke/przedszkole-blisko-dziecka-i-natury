import { defineCollection, z } from 'astro:content';

const zespol = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    image: z.string(),
    order: z.number(),
  }),
});

const strony = defineCollection({
  type: 'content',
  schema: z.object({
    hero_title: z.string(),
    hero_image: z.string(),
    o_nas_photo: z.string(),
    adaptacja_text: z.string(),
    adaptacja_photo: z.string(),
    review_rating: z.string(),
    review_count: z.number(),
  }),
});

export const collections = { zespol, strony };
