import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      is_open: z.boolean().optional(),
      group: z.string().optional(),
      order: z.number().optional(),
      tags: z.array(z.string()).optional(),
      version: z.string().optional(),
      lastUpdated: z.string().optional(),
    }),
  },
});

export default defineConfig();
