---
agent: agent
---

# MDX Documentation File Generator

Generate **MDX documentation files** with correct frontmatter, structure, and language for this project.

---

## 🎯 Mission

Create MDX files for the documentation system following project conventions, with proper frontmatter, localized content, and consistent structure.

---

## 📁 File Structure

```
content/docs/
├── en/                    # English content
│   ├── latest/            # Latest version
│   │   ├── index.mdx      # Root index (version info)
│   │   ├── guides/
│   │   │   ├── index.mdx  # Folder index
│   │   │   └── *.mdx      # Guide pages
│   │   └── components/
│   │       ├── index.mdx  # Folder index
│   │       └── *.mdx      # Component pages
│   └── v1/                # Version 1
│       └── index.mdx
└── pt/                    # Portuguese content
    ├── latest/
    └── v1/
```

---

## 📋 Frontmatter Schema

### All Pages (Required)

```yaml
---
title: string # Page title (REQUIRED)
description: string # Short description (optional)
order: number # Sort order in sidebar (optional)
tags: string[] # Searchable tags (optional)
lastUpdated: string # Date "YYYY-MM-DD" (optional)
---
```

### Index Pages Only (Additional)

```yaml
---
title: string # Folder/section name
is_open: boolean # Sidebar expanded by default (INDEX ONLY)
group: string # Section label in sidebar (INDEX ONLY)
version: string # Semver "X.Y.Z" (ROOT INDEX ONLY)
order: number # Sort position
---
```

---

## 🔍 Frontmatter Details

| Field         | Type       | Applies To          | Description                                                                 |
| ------------- | ---------- | ------------------- | --------------------------------------------------------------------------- |
| `title`       | `string`   | **All**             | Page title, displayed in sidebar and breadcrumbs                            |
| `description` | `string`   | All                 | Meta description for SEO and search                                         |
| `order`       | `number`   | All                 | Sort position (lower = higher). Use decimals for sub-ordering (e.g., `3.1`) |
| `tags`        | `string[]` | All                 | Keywords for search indexing                                                |
| `lastUpdated` | `string`   | All                 | Last modification date (ISO format)                                         |
| `is_open`     | `boolean`  | **Index only**      | If `true`, folder expands in sidebar by default                             |
| `group`       | `string`   | **Index only**      | Label shown above item group in sidebar                                     |
| `version`     | `string`   | **Root index only** | Semantic version of this doc version                                        |

---

## 🌍 Language Rules

### Locale Detection

| Path Pattern         | Language   | Content Language          |
| -------------------- | ---------- | ------------------------- |
| `content/docs/en/**` | English    | All content in English    |
| `content/docs/pt/**` | Portuguese | All content in Portuguese |

### Language Validation Checklist

Before generating content, verify:

- [ ] File path contains correct locale (`en/` or `pt/`)
- [ ] Title is in the correct language
- [ ] Description is in the correct language
- [ ] All headings are in the correct language
- [ ] All paragraphs are in the correct language
- [ ] Tags can be in the content language
- [ ] Code comments should match content language

### Common Terms by Language

| English           | Portuguese       |
| ----------------- | ---------------- |
| Documentation     | Documentação     |
| Getting Started   | Primeiros Passos |
| Installation      | Instalação       |
| Usage             | Uso              |
| Examples          | Exemplos         |
| Components        | Componentes      |
| Guides            | Guias            |
| Configuration     | Configuração     |
| Architecture      | Arquitetura      |
| Overview          | Visão Geral      |
| Table of Contents | Índice           |
| Search            | Busca            |
| Sidebar           | Barra Lateral    |
| Navigation        | Navegação        |

---

## 📝 Templates

### Root Index (`content/docs/{locale}/{version}/index.mdx`)

```mdx
---
title: Documentation | Documentação
description: Technical guide... | Guia técnico...
order: 1
group: Start
tags: ['template', 'documentation']
version: '2.0.0'
lastUpdated: 'YYYY-MM-DD'
---

## Overview | Visão Geral

Content here...
```

### Folder Index (`content/docs/{locale}/{version}/{folder}/index.mdx`)

```mdx
---
title: Guides | Guias
is_open: true
order: 2
---
```

**Note**: Folder indexes are minimal - just frontmatter, rarely content.

### Regular Page (`content/docs/{locale}/{version}/{folder}/page-name.mdx`)

````mdx
---
title: Page Title | Título da Página
description: Short description | Descrição curta
order: 2.1
tags: ['keyword1', 'keyword2']
lastUpdated: 'YYYY-MM-DD'
---

## Section | Seção

Content here...

### Subsection | Subseção

More content...

## Usage | Uso

```tsx
// Code example
```
````

## Examples | Exemplos

...

```

---

## 🔢 Ordering Strategy

| Range | Purpose |
|-------|---------|
| `1` | Root index / Getting started |
| `2-9` | Main sections |
| `X.1`, `X.2` | Pages within section X |
| `10+` | Lower priority sections |

**Example Structure:**

```

order: 1 → index.mdx (root)
order: 2 → guides/index.mdx
order: 2.1 → guides/installation.mdx
order: 2.2 → guides/configuration.mdx
order: 3 → components/index.mdx
order: 3.1 → components/button.mdx
order: 3.2 → components/dialog.mdx

````

---

## ✅ Generation Checklist

Before outputting MDX:

- [ ] Path includes correct locale (`en/` or `pt/`)
- [ ] `title` is in the correct language
- [ ] `description` is in the correct language
- [ ] Content body is entirely in the correct language
- [ ] `order` follows project conventions
- [ ] `is_open` only used in index files
- [ ] `group` only used in index files
- [ ] `version` only in root index files
- [ ] Headings use proper hierarchy (H2, H3, H4)
- [ ] Code examples are relevant and working
- [ ] Links use correct locale prefix

---

## 🚫 Never Do

- ❌ Mix languages in the same file
- ❌ Use `is_open` or `group` in non-index files
- ❌ Use `version` in non-root index files
- ❌ Skip the `title` frontmatter
- ❌ Use H1 (`#`) in content (reserved for title)
- ❌ Hardcode locale in internal links
- ❌ Create files outside `content/docs/` structure

---

## 📚 Internal Links

Use relative paths without locale prefix:

```mdx
<!-- ✅ Correct -->
[Components](/docs/components)
[TOC](/docs/components/toc)

<!-- ❌ Wrong -->
[Components](/en/docs/components)
[Components](../components/index.mdx)
````

---

## 🎬 Execution Flow

When asked to create an MDX file:

1. **Determine locale** from the requested path
2. **Identify file type** (root index, folder index, or page)
3. **Generate frontmatter** with appropriate fields
4. **Write content** in the correct language
5. **Validate** language consistency
6. **Output** the complete MDX file

---

## 📥 Input Format

Provide:

```
Path: content/docs/{locale}/{version}/{folder}/{filename}.mdx
Topic: Brief description of what the page should cover
Type: index | page
```

---

## 📤 Output Format

Return the complete MDX file content:

```mdx
---
title: ...
description: ...
...
---

## Content...
```
