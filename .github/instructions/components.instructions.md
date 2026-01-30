---
applyTo: '**'
---

This file contains clear and mandatory instructions on how to use and create components in this repository. Always follow them when generating, modifying, or reviewing code.

General rules (mandatory):

- **Consult internal documentation first:** always check the files in `docs/shadcn-ui` to understand the component's API, props, examples, and recommendations before using or extending it.
- **Do not create new components inside `components/ui`.** This folder maintains third-party implementations or UI library components; **never** add custom components there.
- **Create new components in the root `components/`.** If you need a custom component or variation, create a new file/dir directly in `components/` (e.g., `components/MyCustomButton.tsx`).
- **Prioritize using existing UI components.** Before creating something new, check if a component in the `components/ui` folder meets your needs; prefer composition and props for customization.
- **Light customizations:** if you need to customize behavior/style, create wrappers or small components in the root `components/` that use/encapsulate components from `components/ui`.
- **Consistent imports:** import components with absolute paths from the project root using the `@/` alias, for example:
  - `import { Button } from '@/components/ui/button'` (use the UI component)
  - `import MyCustomButton from '@/components/MyCustomButton'` (use component created in root `components/`)
- **Name and location:** reusable components should have clear names and be in the root `components/`. Very specific subcomponents can be in `components/<feature>/`.
- **Document new components:** when creating a new component, add documentation in `docs/shadcn-ui` (or create a corresponding file in `docs/`), including usage examples, props, and accessibility when applicable.
- **Tests and accessibility:** check accessibility and write basic tests when creating critical components.
- **Style and formatting:** follow the project's configurations (Prettier, ESLint, etc.). Use `npm run format` and run linters locally.

Recommended procedures:

1. Before implementing: search the corresponding documentation in `docs/shadcn-ui` to confirm if a component that meets the need already exists.
2. If it exists, prefer to reuse/compose. Only create a new component if there is clear justification (API limitations, different behavior need, etc.).
3. When creating a new component: place it in `components/`, document it in `docs/`, and write a small test and usage examples.
4. When opening PRs: describe in the body how the new component differs from existing ones, links to consulted documentation, and include a usage example.

Notes:

- These instructions are **mandatory** for contributions; reviewers and CI can use these rules to validate changes.
- In case of doubt about location or design, open an issue or talk to the team responsible for the system design.
