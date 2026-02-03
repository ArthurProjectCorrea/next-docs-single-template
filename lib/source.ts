import { docs } from 'fumadocs-mdx:collections/server';
import { loader } from 'fumadocs-core/source';
import type { VersionInfo } from '@/types/sidebar';

// Supported locales
const SUPPORTED_LOCALES = ['en', 'pt'] as const;

/**
 * Gets all available documentation versions for a specific locale
 * Extracts version names from the second path segment of each document
 *
 * Structure: Each top-level folder in content/docs/{locale}/ is treated as a version
 * - content/docs/en/latest/ -> 'latest'
 * - content/docs/pt/v1/ -> 'v1'
 */
export function getVersions(locale: string = 'en'): string[] {
  const allDocs = docs.toFumadocsSource();

  // Extract unique version names from paths matching the locale
  const versionsSet = new Set<string>();

  for (const file of allDocs.files) {
    const filePath = file.path || '';
    const segments = filePath.split('/');

    // Check if first segment matches locale
    if (segments[0] === locale && segments[1]) {
      versionsSet.add(segments[1]);
    }
  }

  const versions = Array.from(versionsSet);

  // Sort with 'latest' first, then others in reverse order (v2, v1, etc.)
  return versions.sort((a, b) => {
    if (a === 'latest') return -1;
    if (b === 'latest') return 1;
    return b.localeCompare(a, undefined, { numeric: true });
  });
}

/**
 * Checks if a version exists in the documentation for a specific locale
 */
export function versionExists(version: string, locale: string = 'en'): boolean {
  const versions = getVersions(locale);
  return versions.includes(version);
}

/**
 * Gets the default version (always 'latest', or first available if 'latest' doesn't exist)
 */
export function getDefaultVersion(locale: string = 'en'): string {
  const versions = getVersions(locale);
  if (versions.includes('latest')) {
    return 'latest';
  }
  return versions[0] || 'latest';
}

/**
 * Creates a source loader for a specific version and locale
 * Filters pages to only include those from the specified locale/version folder
 */
export function createVersionedSource(version: string, locale: string = 'en') {
  const allDocs = docs.toFumadocsSource();
  const prefix = `${locale}/${version}`;

  // Filter to only include pages from this locale/version
  const versionedPages = allDocs.files.filter((file) => {
    const filePath = file.path || '';
    return filePath.startsWith(`${prefix}/`) || filePath === prefix;
  });

  // Transform paths to remove locale/version prefix for URL generation
  const transformedPages = versionedPages.map((file) => ({
    ...file,
    path: file.path?.replace(`${prefix}/`, '') || '',
  }));

  return loader({
    baseUrl: `/docs/${version}`,
    source: {
      ...allDocs,
      files: transformedPages,
    },
  });
}

/**
 * Gets source for a specific version and locale
 */
export function getSource(version: string, locale: string = 'en') {
  return createVersionedSource(version, locale);
}

/**
 * Default source for backwards compatibility (uses 'latest' and 'en')
 */
export const source = createVersionedSource('latest', 'en');

/**
 * Gets all sources for all versions and locales
 */
export function getAllSources(locale?: string) {
  if (locale) {
    const versions = getVersions(locale);
    return versions.map((version) => ({
      version,
      locale,
      source: createVersionedSource(version, locale),
    }));
  }

  // Return sources for all locales
  const allSources: {
    version: string;
    locale: string;
    source: ReturnType<typeof createVersionedSource>;
  }[] = [];

  for (const loc of SUPPORTED_LOCALES) {
    const versions = getVersions(loc);
    for (const version of versions) {
      allSources.push({
        version,
        locale: loc,
        source: createVersionedSource(version, loc),
      });
    }
  }

  return allSources;
}

/**
 * Gets version metadata from the index page of a version folder
 * Returns version number from frontmatter and computed display name
 */
export function getVersionInfo(
  version: string,
  locale: string = 'en',
): VersionInfo {
  const source = getSource(version, locale);
  const indexPage = source.getPage([]);

  const data = indexPage?.data as { version?: string } | undefined;
  const semver = data?.version || '0.0.0';
  const isLatest = version === 'latest';

  // Format display name
  const name = isLatest
    ? 'Latest Version'
    : `Version ${version.replace(/^v/, '')}`;

  return {
    name,
    semver,
    isLatest,
  };
}

/**
 * Gets version info for all available versions in a locale
 */
export function getAllVersionsInfo(locale: string = 'en'): VersionInfo[] {
  const versions = getVersions(locale);
  return versions.map((version) => getVersionInfo(version, locale));
}
