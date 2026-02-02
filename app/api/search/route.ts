import { getAllSources } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';
import type { StructuredData } from 'fumadocs-core/mdx-plugins';

// Collect pages from all versions
const allIndexes = getAllSources().flatMap(({ source }) =>
  source.getPages().map((page) => {
    // Cast to access custom frontmatter fields
    const data = page.data as {
      title?: string;
      description?: string;
      tags?: string[];
      structuredData?: StructuredData;
    };
    const tags = data.tags || [];
    // Concatenate tags to description to make them searchable
    const tagsText = tags.length > 0 ? ` Tags: ${tags.join(', ')}` : '';
    const description = (data.description || '') + tagsText;

    return {
      title: data.title || 'Untitled',
      description,
      url: page.url,
      id: page.url,
      structuredData: data.structuredData!,
    };
  }),
);

export const { GET } = createSearchAPI('advanced', {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'portuguese',
  indexes: allIndexes,
});
