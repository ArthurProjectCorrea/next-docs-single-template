/**
 * Search-related type definitions
 * Used by app-search component and search utilities
 */

/**
 * Represents a single match within a section
 */
export interface SearchMatch {
  content: string;
  url: string;
}

/**
 * Represents a section within a search result group
 */
export interface SearchSection {
  heading: string;
  matches: SearchMatch[];
}

/**
 * Represents a grouped search result by page
 * Contains page metadata and nested sections with matches
 */
export interface SearchResultGroup {
  pageTitle: string;
  pageUrl: string;
  tags?: string[];
  sections: SearchSection[];
}
