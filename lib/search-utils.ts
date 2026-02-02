import type { SortedResult } from 'fumadocs-core/search';
import type { SearchResultGroup, SearchSection } from '@/types/search';

/**
 * Highlights query matches in text by wrapping them in <mark> elements
 * Returns React nodes with highlighted portions
 */
export function highlightMatch(
  text: string,
  query: string,
): (string | React.ReactElement)[] {
  if (!query.trim()) return [text];

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  );
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      // Reset regex lastIndex for subsequent tests
      regex.lastIndex = 0;
      return {
        type: 'mark',
        key: index,
        content: part,
      } as unknown as React.ReactElement;
    }
    return part;
  });
}

/**
 * Renders highlighted match as React node
 * Separates the logic from rendering concern
 */
export interface HighlightedPart {
  type: 'text' | 'mark';
  content: string;
  key: number;
}

/**
 * Parses text and query into parts for highlighting
 * Returns array of parts with type indicators
 */
export function parseHighlightParts(
  text: string,
  query: string,
): HighlightedPart[] {
  if (!query.trim()) {
    return [{ type: 'text', content: text, key: 0 }];
  }

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  );
  const parts = text.split(regex);

  return parts.map((part, index) => ({
    type: regex.test(part) ? 'mark' : 'text',
    content: part,
    key: index,
  }));
}

/**
 * Truncates text around the query match with surrounding context
 * @param text - The full text to truncate
 * @param query - The search query to find
 * @param contextLength - Number of characters to show before/after match
 */
export function truncateWithContext(
  text: string,
  query: string,
  contextLength: number = 40,
): string {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerQuery);

  if (matchIndex === -1) return text.slice(0, contextLength * 2);

  const start = Math.max(0, matchIndex - contextLength);
  const end = Math.min(text.length, matchIndex + query.length + contextLength);

  let result = text.slice(start, end);

  if (start > 0) result = '... ' + result;
  if (end < text.length) result = result + ' ...';

  return result;
}

/**
 * Converts a URL hash to a readable title
 * Example: "getting-started" → "Getting Started"
 */
export function formatHashToTitle(hash: string): string {
  return hash
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Checks if a result is relevant based on the query
 * Filters out results that only match single characters or very common words
 */
export function isRelevantResult(content: string, query: string): boolean {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedContent = content.toLowerCase();

  // Ignore queries shorter than 2 characters
  if (normalizedQuery.length < 2) return false;

  // Check if the content contains the full query as a word or phrase
  const queryWords = normalizedQuery.split(/\s+/);

  // For single word queries, check if it appears as a word (not just a letter match)
  if (queryWords.length === 1) {
    // Create a regex that matches the word with word boundaries or at least 3 consecutive chars
    const wordRegex = new RegExp(
      `\\b${normalizedQuery}|${normalizedQuery}\\b`,
      'i',
    );
    return wordRegex.test(normalizedContent) || normalizedQuery.length >= 3;
  }

  // For multi-word queries, check if all words are present
  return queryWords.every((word) =>
    word.length < 2 ? true : normalizedContent.includes(word),
  );
}

/**
 * Calculates a relevance score for sorting results
 * Higher score = more relevant
 */
export function calculateRelevanceScore(
  content: string,
  query: string,
): number {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedContent = content.toLowerCase();
  let score = 0;

  // Exact match gets highest score
  if (normalizedContent.includes(normalizedQuery)) {
    score += 100;
  }

  // Word boundary match gets bonus
  const wordBoundaryRegex = new RegExp(`\\b${normalizedQuery}\\b`, 'i');
  if (wordBoundaryRegex.test(content)) {
    score += 50;
  }

  // Title/heading matches get bonus (shorter content = likely heading)
  if (content.length < 50) {
    score += 25;
  }

  // Penalize very long content (likely less focused)
  if (content.length > 200) {
    score -= 10;
  }

  return score;
}

/**
 * Groups raw search results into a structured format by page
 * Filters by relevance, sorts by score, and limits results
 */
export function groupSearchResults(
  results: SortedResult[],
  query: string,
): SearchResultGroup[] {
  const groups: Map<string, SearchResultGroup> = new Map();

  // Skip grouping if query is too short
  if (query.trim().length < 2) {
    return [];
  }

  // First pass: collect all headings by their hash
  const headingsByHash: Map<string, string> = new Map();
  results.forEach((result) => {
    if (result.type === 'heading' && result.url.includes('#')) {
      const hash = result.url.split('#')[1];
      headingsByHash.set(hash, result.content);
    }
  });

  // Filter and sort results by relevance
  const relevantResults = results
    .filter((result) => isRelevantResult(result.content, query))
    .sort(
      (a, b) =>
        calculateRelevanceScore(b.content, query) -
        calculateRelevanceScore(a.content, query),
    );

  // Limit total results to prevent overwhelming UI
  const limitedResults = relevantResults.slice(0, 30);

  limitedResults.forEach((result) => {
    const pageUrl =
      result.type === 'page' ? result.url : result.url.split('#')[0];
    const pageTitle =
      result.type === 'page'
        ? result.content
        : (results.find((r) => r.type === 'page' && r.url === pageUrl)
            ?.content ?? 'Untitled');

    if (!groups.has(pageUrl)) {
      // Find page result to get metadata including tags
      const pageResult = results.find(
        (r) => r.type === 'page' && r.url === pageUrl,
      );
      const pageData = pageResult as { data?: { tags?: string[] } } | undefined;
      const tags = pageData?.data?.tags || [];

      groups.set(pageUrl, {
        pageTitle,
        pageUrl,
        tags,
        sections: [],
      });
    }

    const group = groups.get(pageUrl)!;

    if (result.type === 'heading' || result.type === 'text') {
      // For text results, try to find the heading from the URL hash
      let heading: string;
      if (result.type === 'heading') {
        heading = result.content;
      } else {
        // Extract hash from URL and find corresponding heading
        const hash = result.url.includes('#') ? result.url.split('#')[1] : '';
        heading = hash
          ? headingsByHash.get(hash) || formatHashToTitle(hash)
          : 'Content';
      }

      let section: SearchSection | undefined = group.sections.find(
        (s) => s.heading === heading,
      );
      if (!section) {
        section = { heading, matches: [] };
        group.sections.push(section);
      }

      if (result.type === 'text') {
        // Avoid duplicate content in same section
        const existingContent = section.matches.map((m) => m.content);
        const truncatedContent = truncateWithContext(result.content, query);
        if (!existingContent.includes(truncatedContent)) {
          section.matches.push({
            content: truncatedContent,
            url: result.url,
          });
        }
      }
    }
  });

  // Limit matches per section and remove empty sections
  return Array.from(groups.values()).map((group) => ({
    ...group,
    sections: group.sections
      .filter((s) => s.matches.length > 0 || s.heading !== 'Content')
      .map((s) => ({
        ...s,
        matches: s.matches.slice(0, 3), // Max 3 matches per section
      })),
  }));
}
