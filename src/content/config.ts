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
  schema: z.record(z.any()),
});

export const collections = { zespol, strony };
