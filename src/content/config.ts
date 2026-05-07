import { defineCollection, z } from 'astro:content';

const caseStudyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number(),
    category: z.string(),
    featured: z.boolean().default(false),
    tags: z
      .array(
        z.object({
          label: z.string(),
          color: z.enum([
            'amber', 'blue', 'green', 'red', 'indigo',
            'pink', 'purple', 'emerald', 'sky', 'orange',
          ]),
        }),
      )
      .optional(),
    image: z.string().optional(),
    demo: z.string().optional(),
    github: z.string().optional(),
    uiShots: z
      .array(
        z.object({
          src: z.string(),
          title: z.string(),
          alt: z.string().optional(),
          type: z.string().optional(),
          span: z.number().int().min(1).max(2).optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = {
  'case-study': caseStudyCollection,
};
