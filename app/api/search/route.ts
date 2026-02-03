import { getAllSources } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';
import type { StructuredData } from 'fumadocs-core/mdx-plugins';
import { type NextRequest } from 'next/server';

// Supported locales with their Orama language settings
const localeLanguageMap: Record<string, string> = {
  en: 'english',
  pt: 'portuguese',
};

// Build indexes per locale
function buildIndexesForLocale(locale: string) {
  return getAllSources(locale).flatMap(({ source }) =>
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
        url: `/${locale}${page.url}`,
        id: `${locale}${page.url}`,
        structuredData: data.structuredData!,
      };
    }),
  );
}

// Create search APIs for each locale
const searchAPIs: Record<string, ReturnType<typeof createSearchAPI>> = {};

for (const locale of Object.keys(localeLanguageMap)) {
  const indexes = buildIndexesForLocale(locale);
  searchAPIs[locale] = createSearchAPI('advanced', {
    language: localeLanguageMap[locale],
    indexes,
  });
}

// Handle GET request with locale parameter
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  // Get the appropriate search API for the locale
  const searchAPI = searchAPIs[locale] || searchAPIs['en'];

  // Call the search API's GET handler
  return searchAPI.GET(request);
}
