import { docs } from 'fumadocs-mdx:collections/server';
import { loader } from 'fumadocs-core/source';
import type { VersionInfo } from '@/types/sidebar';

/**
 * Gets all available documentation versions dynamically from content/docs folder structure
 * Extracts version names from the first path segment of each document
 *
 * Structure: Each top-level folder in content/docs/ is treated as a version
 * - content/docs/latest/ -> 'latest'
 * - content/docs/v1/ -> 'v1'
 */
export function getVersions(): string[] {
  const allDocs = docs.toFumadocsSource();

  // Extract unique version names from the first segment of each file path
  const versionsSet = new Set<string>();

  for (const file of allDocs.files) {
    const filePath = file.path || '';
    const firstSegment = filePath.split('/')[0];
    if (firstSegment) {
      versionsSet.add(firstSegment);
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
 * Checks if a version exists in the documentation
 */
export function versionExists(version: string): boolean {
  const versions = getVersions();
  return versions.includes(version);
}

/**
 * Gets the default version (always 'latest', or first available if 'latest' doesn't exist)
 */
export function getDefaultVersion(): string {
  const versions = getVersions();
  if (versions.includes('latest')) {
    return 'latest';
  }
  return versions[0] || 'latest';
}

/**
 * Creates a source loader for a specific version
 * Filters pages to only include those from the specified version folder
 */
export function createVersionedSource(version: string) {
  const allDocs = docs.toFumadocsSource();

  // Filter to only include pages from this version
  const versionedPages = allDocs.files.filter((file) => {
    const filePath = file.path || '';
    return filePath.startsWith(`${version}/`) || filePath === version;
  });

  // Transform paths to remove version prefix for URL generation
  const transformedPages = versionedPages.map((file) => ({
    ...file,
    path: file.path?.replace(`${version}/`, '') || '',
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
 * Gets source for a specific version
 */
export function getSource(version: string) {
  return createVersionedSource(version);
}

/**
 * Default source for backwards compatibility (uses 'latest')
 */
export const source = createVersionedSource('latest');

/**
 * Gets all sources for all versions
 */
export function getAllSources() {
  const versions = getVersions();
  return versions.map((version) => ({
    version,
    source: createVersionedSource(version),
  }));
}

/**
 * Gets version metadata from the index page of a version folder
 * Returns version number from frontmatter and computed display name
 */
export function getVersionInfo(version: string): VersionInfo {
  const source = getSource(version);
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
 * Gets version info for all available versions
 */
export function getAllVersionsInfo(): VersionInfo[] {
  const versions = getVersions();
  return versions.map((version) => getVersionInfo(version));
}
