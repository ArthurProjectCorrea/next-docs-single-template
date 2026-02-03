# Copilot / AI Agent Instructions for next-docs-single-template

Actionable instructions for AI coding agents working in this versioned, multi-language documentation template.

---

## Architecture Overview

- **Next.js 16 (App Router)** + TypeScript + Tailwind 4
- **Multi-language (i18n)**: Routes under `app/[locale]/`, content in `content/docs/{locale}/{version}/`
- **Versioned documentation**: Each locale has versions (`latest/`, `v1/`, etc.)
- **UI separation**: Primitives in `components/ui/` (shadcn/ui - **never modify**), project components in `components/`
- **Server-only utilities**: `lib/source.ts`, `lib/sidebar-utils.ts`, `lib/i18n.ts`, `lib/dictionaries.ts` use `server-only`
- **Fumadocs**: MDX processing via `fumadocs-mdx` + `fumadocs-core`

## Content Structure

```
content/docs/
├── en/                    # English
│   ├── latest/            # Current version
│   │   ├── index.mdx      # version: "2.0.0"
│   │   └── guides/
│   │       └── index.mdx  # is_open: true (folder indexes only)
│   └── v1/
└── pt/                    # Portuguese
    ├── latest/
    └── v1/
```

## Key Files & Data Flow

| File                                     | Purpose                                                         |
| ---------------------------------------- | --------------------------------------------------------------- |
| `lib/i18n.ts`                            | Locale types, validation, pathname helpers (server-only)        |
| `lib/dictionaries.ts`                    | UI translations loader (server-only)                            |
| `lib/source.ts`                          | `getSource(version)`, `getVersions(locale)`, `getVersionInfo()` |
| `lib/sidebar-utils.ts`                   | `convertTreeToNav(tree, version, locale)` - adds locale prefix  |
| `app/[locale]/layout.tsx`                | Root layout with `DictionaryProvider`                           |
| `app/[locale]/docs/[version]/layout.tsx` | Docs layout with sidebar, TOC                                   |
| `contexts/dictionary-context.tsx`        | Client-side dictionary access                                   |
| `dictionaries/{en,pt}.json`              | UI string translations                                          |

## i18n System

```typescript
// Supported locales (lib/i18n.ts)
export const locales = ['en', 'pt'] as const;
export type Locale = 'en' | 'pt';

// Server: Load dictionary
import { getDictionary } from '@/lib/dictionaries';
const dict = await getDictionary(locale);

// Client: Use context
import { useDictionary } from '@/contexts/dictionary-context';
const { dictionary } = useDictionary();
```

**URL Structure**: `/{locale}/docs/{version}/{slug}` → `/en/docs/latest/guides`

## Server/Client Boundary (Critical)

```typescript
// ✅ Server Component
import { getSource, getVersionInfo } from '@/lib/source';
import { getDictionary } from '@/lib/dictionaries';

// ❌ Client Component - Will fail!
('use client');
import { getSource } from '@/lib/source'; // server-only module
```

**Pattern**: Server fetches data → passes serializable props → Client renders

## MDX Frontmatter

```yaml
# All pages
title: 'Page Title' # required
description: '...' # optional
order: 2.1 # sidebar sort (decimals for sub-ordering)
tags: ['search', 'terms'] # optional

# Index pages only
is_open: true # folder expanded in sidebar
group: 'Section Name' # sidebar section label
version: '2.0.0' # ROOT index only
```

## Component Rules

- **Never modify** `components/ui/*` (shadcn/ui primitives)
- **Create custom components** in `components/` root
- **Always use** `@/` imports, never relative
- **Document** new components in `docs/shadcn-ui/`

## Commands

| Command          | Purpose                |
| ---------------- | ---------------------- |
| `npm run dev`    | Dev server (Turbopack) |
| `npm run build`  | Production build       |
| `npm run lint`   | ESLint                 |
| `npm run format` | Prettier               |

## Common Patterns

### Adding locale prefix to URLs

```typescript
// In server component
const localePrefix = locale ? `/${locale}` : '';
const url = `${localePrefix}/docs/${version}/${slug}`;
```

### Type assertions for page data

```typescript
const data = page.data as unknown as CustomPageData;
```

### Creating new content

1. Create MDX in `content/docs/{locale}/{version}/`
2. Match structure across locales (en + pt)
3. Use correct language in content body

## PR Checklist

- [ ] `npm run build` passes
- [ ] `npm run lint` clean
- [ ] Content exists in all locales
- [ ] Server/client boundary respected
- [ ] No modifications to `components/ui/`
