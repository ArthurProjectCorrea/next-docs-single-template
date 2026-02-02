# Copilot / AI Agent Instructions for next-template

Short, actionable instructions to help an AI coding agent be productive in this repository.

---

## Big picture (what this repo is and why it is structured this way)

- Next.js (App Router) + TypeScript + Tailwind: app-centric folder layout lives under `app/`; pages and examples mix server and client components.
- UI primitives (upstream or third-party) live in `components/ui/`. Project-specific, reusable components belong in the root `components/` folder (see `.github/instructions/components.instructions.md`).
- Documentation for component patterns lives in `docs/shadcn-ui/` — this is the primary source for usage, accessibility, and examples.
- Fumadocs integration: MDX content in `content/docs/`, processed via `fumadocs-mdx` and `fumadocs-core` for dynamic documentation with TOC, search, and sidebar navigation.
- Contexts for shared state: `contexts/` folder holds React context providers (e.g., TOC context for table of contents).
- Build and developer flows are conservative: formatting and linting are enforced via `lefthook` + `lint-staged` to maintain consistent style.

## Where to look first

- App entry & theming: `app/layout.tsx`, `components/theme-provider.tsx` (see ThemeProvider usage and TopLoader integration).
- Component patterns and primitives: `components/ui/` (primitives) and `components/` (project components).
- Component documentation: `docs/shadcn-ui/` and `.github/instructions/components.instructions.md`.
- Fumadocs setup: `lib/source.ts` (source configuration), `source.config.ts` (schema for MDX frontmatter), `app/docs/layout.tsx` (page tree sorting and sidebar).
- Contexts: `contexts/` for providers like TOC context.
- CI workflow: `.github/workflows/ci.yml` — runs `build`, `lint`, and `prettier --check`.
- Commit prompt: `.github/prompts/commit.prompt.md` (semantic commit guideline for the project).

## Project-specific conventions (be precise)

- Components:
  - Do not add custom components to `components/ui/`; put them under `components/` instead.
  - Prefer composition and wrappers to extend upstream primitives rather than copying them.
  - Use absolute imports with the `@/` alias: `import X from '@/components/X'` or `import { Button } from '@/components/ui/button'`.
- Contexts:
  - Place React context providers in `contexts/` folder, not in `components/`.
  - Example: `contexts/toc-context.tsx` for TOC state management.
- MDX and Docs:
  - Content in `content/docs/` with frontmatter (title, description, group, order).
  - Sidebar order controlled by `order` field; sorting logic in `app/docs/layout.tsx` fetches data dynamically.
  - Use Fumadocs hooks like `useTOC` for TOC integration.
- Formatting & linting:
  - Prettier (with `prettier-plugin-tailwindcss`) is authoritative. Run `npm run format` locally and rely on `lint-staged` in pre-commit hooks.
  - Lint with `npm run lint` and fix issues before opening PRs.
- Git hooks:
  - `npm run prepare` installs Lefthook; test hooks with `npx lefthook run pre-commit`.
- CI:
  - `.github/workflows/ci.yml` uses **Node 20.9.0 (minimum required by Next.js)** and runs `npm ci` → `npm run build` → `npm run lint` → `npx prettier --check .`.
  - If builds fail due to Node version, update the workflow `node-version` or add an `engines.node` entry to `package.json`.

## Debugging and common fixes (explicit examples)

- Build/type errors often stem from mismatch between TypeScript types and runtime exports of third-party libraries. Quick check:
  - Run `npm run build` (or `next build`) to see TypeScript errors.
  - Inspect runtime exports: `node -e "console.log(Object.keys(require('react-resizable-panels')));"`.
  - Example: `components/ui/resizable.tsx` was updated to use `Group`, `Panel`, `Separator` after discovering different runtime exports.
- ESLint purity error example: `components/ui/sidebar.tsx` previously called `Math.random()` during render — replace impure calls or compute deterministic placeholders for skeletons.
- Dark-mode integration: follow `docs/shadcn-ui/dark-mode.md` and ensure `ThemeProvider` is applied in `app/layout.tsx` with `suppressHydrationWarning` on `<html>` when necessary.
- Fumadocs issues: If sidebar order is wrong, check `order` in MDX frontmatter and `sortTree` function in `app/docs/layout.tsx` for data fetching.

## How to add a component or change UI

- Steps for component changes:
  1. Search `docs/shadcn-ui/` and `components/ui/` for an existing primitive.
  2. If you need new behavior, create `components/MyThing.tsx` and add docs in `docs/shadcn-ui/MyThing.md` with examples.
  3. Add basic accessibility notes and a small test if the component is critical.
  4. Run `npm run format` and `npm run lint` before committing.
  5. Open PR with: summary, why upstream primitives don’t suffice, and a usage example.

## PR checklist & expectations for agents

- Keep changes scoped and incremental; avoid large unrelated refactors in the same PR.
- Include or update docs under `docs/shadcn-ui/` for new components or major changes.
- Run `npm run build` locally to catch TypeScript issues; mention how you validated runtime exports if you changed third-party integrations.
- Ensure `npm run lint` and `npm run format` produce no errors; fix ESLint warnings where meaningful.

## Useful commands (quick reference)

- Dev: npm run dev
- Build: npm run build
- Lint: npm run lint
- Format: npm run format
- Install deps: npm ci / npm install
- Install hooks: npm run prepare
- Test hooks: npx lefthook run pre-commit
- Prettier check (CI-style): npx prettier --check .

## Releases

- Automated releases are handled with `semantic-release` via `.github/workflows/release.yml`.
- By default, **npm publishing is disabled** (the workflow creates GitHub releases and updates the changelog). If you enable npm publishing, add `@semantic-release/npm` and set the `NPM_TOKEN` secret in repository settings.
- The release workflow now requires write permissions for contents, issues, and pull requests. If the runner cannot push or create issues, either enable **Allow GitHub Actions to push to this branch** in branch protection, or add a Personal Access Token with `repo` scope as the secret `SEMANTIC_RELEASE_TOKEN`. The workflow will use `SEMANTIC_RELEASE_TOKEN` if present; otherwise it falls back to the built-in `GITHUB_TOKEN`.
- To run a release locally for testing, run `npx semantic-release --dry-run` and inspect the output.

---

If you'd like, I can: (a) add a short PR template to `.github/PULL_REQUEST_TEMPLATE.md` that enforces the checklist above, or (b) extract the most common ESLint/build fixes into a short `CONTRIBUTING.md`. Tell me which you'd prefer and I'll draft it.
