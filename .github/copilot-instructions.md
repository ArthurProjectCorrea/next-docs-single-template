# Copilot / AI Agent Instructions for next-docs-single-template

Actionable instructions for AI coding agents working in this versioned documentation template.

---

## Architecture Overview

- **Next.js 16 (App Router)** + TypeScript + Tailwind 4: Server/client component mix under `app/`.
- **Versioned documentation**: Content in `content/docs/{version}/` (e.g., `latest/`, `v1/`). Dynamic routes at `app/docs/[version]/[[...slug]]/`.
- **UI separation**: Primitives in `components/ui/` (shadcn/ui - **never modify**), project components in `components/`.
- **Server-only utilities**: `lib/source.ts` and `lib/sidebar-utils.ts` use `fumadocs-mdx:collections/server` - cannot be imported in client components.
- **Contexts**: State providers in `contexts/` (e.g., `toc-context.tsx`, `page-content.tsx`).
- **Fumadocs**: MDX processing via `fumadocs-mdx` + `fumadocs-core` with search, TOC, and sidebar.

## Key Files & Data Flow

| File                                      | Purpose                                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `source.config.ts`                        | MDX frontmatter schema (title, description, order, tags, version)                                     |
| `lib/source.ts`                           | Versioned source loader: `getVersions()`, `getVersionInfo()`, `getAllSources()`, `getSource(version)` |
| `lib/sidebar-utils.ts`                    | Server-only: `convertTreeToNav()`, `sortPageTree()`                                                   |
| `lib/pagination-utils.ts`                 | Previous/next page links with version support                                                         |
| `app/docs/[version]/layout.tsx`           | Docs layout with sidebar, TOC, version switcher                                                       |
| `app/docs/[version]/[[...slug]]/page.tsx` | Page renderer with `generateStaticParams`                                                             |
| `components/doc-sidebar.tsx`              | Client sidebar receiving pre-converted `navItems`                                                     |
| `components/app-search.tsx`               | Search with version filtering toggle                                                                  |
| `components/app-version-switcher.tsx`     | Version dropdown with semver display                                                                  |
| `types/sidebar.ts`                        | Shared types: `TreeNode`, `PageTreeNode`, `NavItem`, `VersionInfo`                                    |

## Versioning System

```
content/docs/
├── latest/           # Current version folder
│   ├── index.mdx     # version: "2.0.0" in frontmatter
│   └── ...
└── v1/               # Archived version folder
    ├── index.mdx     # version: "1.0.0" in frontmatter
    └── ...
```

- **Folder-based**: Each folder in `content/docs/` is a version (`latest`, `v1`, `v2`).
- **Auto-discovery**: `getVersions()` extracts versions from file paths dynamically.
- **Frontmatter `version` field**: Semantic version string in root `index.mdx` per version.
- **VersionInfo type**: `{ name: string, semver: string, isLatest: boolean }` for UI display.
- **Search filtering**: `app-search.tsx` filters results by URL prefix `/docs/{version}/`.

## Server/Client Boundary (Critical)

```typescript
// ✅ Server Component (app/docs/[version]/layout.tsx)
import { getSource, getVersionInfo } from '@/lib/source';
import { sortPageTree, convertTreeToNav } from '@/lib/sidebar-utils';

const source = getSource(version);
const navItems = convertTreeToNav(
  sortPageTree(source.pageTree, version),
  version,
);
// Pass navItems as props to client component

// ❌ Client Component - NEVER import server-only modules
('use client');
import { getSource } from '@/lib/source'; // Will fail!
```

**Rule**: Server components fetch/process data, pass serializable props to client components.

## Component Conventions

```typescript
// ✅ Correct imports
import { Button } from '@/components/ui/button'; // UI primitive
import { DocSidebar } from '@/components/doc-sidebar'; // Project component
import type { VersionInfo } from '@/types/sidebar'; // Shared types

// ❌ Never add custom components to components/ui/
// ✅ Create in components/ instead
```

- **New components**: Create in `components/`, document in `docs/shadcn-ui/`.
- **Type assertions**: Use `as unknown as CustomPageData` when accessing fumadocs page data with custom frontmatter fields.

## MDX Frontmatter Schema

```yaml
---
title: Page Title # required
description: Short desc # optional
order: 1 # optional, controls sidebar order
group: Category Name # optional, adds section label
tags: ['tag1', 'tag2'] # optional, searchable
is_open: true # optional, folder expanded by default
version: '1.0.0' # only on root index.mdx per version
---
```

## Commands

| Command           | Purpose                                 |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start dev server (Turbopack)            |
| `npm run build`   | Production build (validates TypeScript) |
| `npm run lint`    | ESLint check                            |
| `npm run format`  | Prettier format                         |
| `npm run prepare` | Install git hooks (Lefthook)            |

## Common Patterns & Fixes

### Server-only error

```
Module not found: 'fs'
```

**Fix**: Move logic to Server Component, pass data as props to client.

### Type errors on page.data

```typescript
const data = page.data as unknown as CustomPageData;
```

### Sidebar not updating

Check `order` field in frontmatter; verify `sortPageTree` receives correct version.

### Search not filtering versions

Ensure URL format matches `/docs/{version}/...` in filter logic.

### Lint: setState in useEffect

Use `useSyncExternalStore` instead of `useState` + `useEffect` with setState.

## Adding a New Version

1. Create folder: `content/docs/v2/`
2. Add `index.mdx` with `version: "2.0.0"` frontmatter
3. Copy/create pages in the new folder
4. Versions are auto-discovered - no code changes needed

## CI Workflow

`.github/workflows/ci.yml` runs:

1. `npm ci`
2. `npm run build`
3. `npm run lint`
4. `npx prettier --check .`

## PR Checklist

- [ ] `npm run build` passes
- [ ] `npm run lint` has no errors
- [ ] New components documented in `docs/shadcn-ui/`
- [ ] Server/client boundary respected
- [ ] Version-aware if touching docs routes

## Releases

Automated via `semantic-release` in `.github/workflows/release.yml`. Uses semantic commit messages for versioning.
