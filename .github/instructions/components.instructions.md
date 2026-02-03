---
applyTo: '**'
---

# Component Guidelines

> **MANDATORY** rules for all contributors and AI agents working with components.

---

## 🚫 DO NOT

| Action                                                  | Reason                                 |
| ------------------------------------------------------- | -------------------------------------- |
| Create files in `components/ui/`                        | Reserved for shadcn/ui primitives only |
| Modify existing `components/ui/*` files                 | Third-party library components         |
| Duplicate functionality that exists in `components/ui/` | Use composition instead                |
| Use relative imports for components                     | Always use `@/` alias                  |
| Skip documentation for new components                   | All new components need docs           |

---

## ✅ DO

| Action                             | Location                       |
| ---------------------------------- | ------------------------------ |
| Create custom components           | `components/` root             |
| Create feature-specific components | `components/<feature>/`        |
| Document new components            | `docs/shadcn-ui/` or `docs/`   |
| Wrap/extend UI components          | `components/` with composition |

---

## 📁 File Structure

```
components/
├── ui/                    # ❌ DO NOT MODIFY - shadcn/ui primitives
│   ├── button.tsx
│   ├── dialog.tsx
│   └── ...
├── app-header.tsx         # ✅ Project components
├── doc-sidebar.tsx        # ✅ Feature components
└── <feature>/             # ✅ Feature-specific folders
    └── custom-widget.tsx
```

---

## 🔍 Before Creating a Component

1. **Check `docs/shadcn-ui/`** for existing component documentation
2. **Check `components/ui/`** for available primitives
3. **Can it be achieved with composition?** Use props/children instead of new component
4. **Still need a new component?** Create in `components/` root

---

## 📝 Import Pattern

```typescript
// ✅ CORRECT - UI primitives
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// ✅ CORRECT - Custom components
import { AppHeader } from '@/components/app-header';
import { DocSidebar } from '@/components/doc-sidebar';

// ❌ WRONG - Relative imports
import { Button } from '../ui/button';
import { AppHeader } from './app-header';
```

---

## 🆕 Creating New Components

### Required Steps

1. **Create file** in `components/` (not `components/ui/`)
2. **Use existing UI primitives** from `components/ui/` when possible
3. **Add documentation** in `docs/shadcn-ui/<component-name>.md`
4. **Include in docs:**
   - Component description
   - Props table
   - Usage examples
   - Accessibility notes (if applicable)

### Template

```typescript
// components/my-component.tsx
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  // props here
}

export function MyComponent({ ...props }: MyComponentProps) {
  return (
    // Use UI primitives via composition
  );
}
```

---

## 🎨 Styling Rules

| Rule                               | Example                             |
| ---------------------------------- | ----------------------------------- |
| Use Tailwind classes               | `className="flex items-center"`     |
| Use design tokens                  | `bg-primary`, `text-foreground`     |
| Use `cn()` for conditional classes | `cn("base", condition && "active")` |
| **Never** hardcode colors          | ❌ `bg-black`, `#fff`, `rgb(...)`   |

---

## ✔️ PR Checklist

- [ ] Component created in `components/` (not `components/ui/`)
- [ ] Uses existing UI primitives when possible
- [ ] Documentation added in `docs/`
- [ ] Imports use `@/` alias
- [ ] No hardcoded colors
- [ ] Passes `npm run lint`
- [ ] Passes `npm run format`

---

## 📚 Quick Reference

| Need                | Solution                                    |
| ------------------- | ------------------------------------------- |
| New button variant  | Compose with `<Button>` + custom classes    |
| New modal           | Compose with `<Dialog>` components          |
| Custom form field   | Wrap `<Input>` + `<Label>` in new component |
| Complex widget      | Create in `components/` using UI primitives |
| Feature-specific UI | Create in `components/<feature>/`           |
