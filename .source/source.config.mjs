// source.config.ts
import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';
var docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      is_open: z.boolean().optional(),
      group: z.string().optional(),
      order: z.number().optional(),
    }),
  },
});
var source_config_default = defineConfig();
export { source_config_default as default, docs };
