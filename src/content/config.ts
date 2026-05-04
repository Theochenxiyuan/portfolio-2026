import { defineCollection, z } from 'astro:content';

const caseStudyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number(),
    category: z.string(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    demo: z.string().optional(),
    github: z.string().optional(),
  }),
});

export const collections = {
  'case-study': caseStudyCollection,
};
