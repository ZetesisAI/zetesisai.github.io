import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const papers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    abstract: z.string(),
    pubDate: z.coerce.date(),
    authors: z.array(z.string()).default(['Zetesis AI Research']),
    tags: z.array(z.string()).default([]),
    links: z
      .object({
        pdf: z.string().optional(),
        arxiv: z.string().url().optional(),
        code: z.string().url().optional(),
      })
      .default({}),
    draft: z.boolean().default(false),
  }),
});

export const collections = { papers };
