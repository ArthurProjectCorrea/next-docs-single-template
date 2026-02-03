---
agent: agent
---

# Git Commit Message Generator

Generate **semantic, professional Git commit messages** following **Conventional Commits** specification.

---

## 🎯 Mission

Analyze staged changes and produce a **single, ready-to-use commit message** for:

```bash
git commit -m "<message>"
```

---

## 📥 Input Requirements

Before generating, gather:

1. **Staged files**: Run `git diff --staged --name-only`
2. **Change details**: Run `git diff --staged` for unified diffs
3. **File status**: Run `git status --porcelain`

---

## 📤 Output Format

**CRITICAL**: Output ONLY the commit message. No explanations, no markdown blocks, no metadata.

```
<type>(<scope>): <subject>

<body>

<footer>
```

---

## 📋 Commit Types

| Type       | When to Use                                |
| ---------- | ------------------------------------------ |
| `feat`     | New feature or functionality               |
| `fix`      | Bug fix                                    |
| `docs`     | Documentation only                         |
| `style`    | Formatting, whitespace (no logic change)   |
| `refactor` | Code restructuring without behavior change |
| `perf`     | Performance improvement                    |
| `test`     | Adding or modifying tests                  |
| `build`    | Build system, dependencies                 |
| `ci`       | CI/CD configuration                        |
| `chore`    | Maintenance, tooling, configs              |

---

## 🔍 Scope Detection

Infer scope from **file paths** or **affected domain**:

| Path Pattern       | Suggested Scope             |
| ------------------ | --------------------------- |
| `components/ui/*`  | `ui`                        |
| `components/app-*` | `components`                |
| `components/doc-*` | `docs`                      |
| `lib/*`            | `lib` or specific util name |
| `app/api/*`        | `api`                       |
| `app/[locale]/*`   | `i18n` or `routing`         |
| `contexts/*`       | `context` or feature name   |
| `hooks/*`          | `hooks`                     |
| `types/*`          | `types`                     |
| `content/docs/*`   | `content`                   |
| `.github/*`        | `ci` or `github`            |
| Config files       | `config`                    |

**Rules:**

- Use lowercase, short names
- Omit scope if changes span unrelated domains
- Group related changes under single scope

---

## ✍️ Subject Line Rules

| Rule                   | Example                                            |
| ---------------------- | -------------------------------------------------- |
| Imperative mood        | ✅ "add" ❌ "added" ❌ "adding"                    |
| No period at end       | ✅ "add feature" ❌ "add feature."                 |
| Max 50 characters      | Keep it concise                                    |
| Describe WHAT, not HOW | ✅ "add auth" ❌ "implement OAuth2 flow with PKCE" |
| Lowercase after type   | ✅ "feat: add" ❌ "feat: Add"                      |

---

## 📝 Body Guidelines

Include body **only when it adds value**:

✅ **Include when:**

- Change is complex or non-obvious
- Multiple related changes in one commit
- Breaking change needs explanation
- Context helps future readers

❌ **Skip when:**

- Subject is self-explanatory
- Simple single-file change
- Formatting/style only

**Body format:**

- Separate from header with blank line
- Wrap at ~72 characters
- Explain **what** and **why**, not line-by-line

---

## 🚨 Breaking Change Detection

**Indicators of breaking changes:**

| Change Type                | Example                          |
| -------------------------- | -------------------------------- |
| Removed public API         | Function/method deleted          |
| Renamed exports            | `Button` → `BaseButton`          |
| Changed function signature | Required param added             |
| Modified return types      | Object shape changed             |
| Route changes              | `/api/users` → `/api/v2/users`   |
| Prop changes               | Required prop added to component |
| Environment changes        | New required env var             |

**When detected:**

1. Use normal type (NOT a special type)
2. Add `!` after type: `feat!:` or `feat(scope)!:`
3. Explain impact in body
4. Add footer: `BREAKING CHANGE: <description>`

---

## 🔄 Multi-File Change Strategy

| Scenario                  | Approach                                    |
| ------------------------- | ------------------------------------------- |
| Same feature across files | Single scope, summarize in body             |
| Related refactoring       | Use `refactor`, list files in body          |
| Mixed types (feat + fix)  | Use dominant type, note others in body      |
| Unrelated changes         | **Ask user to split** or use broadest scope |

---

## 📊 Decision Flowchart

```
1. Are there staged files?
   NO  → Return empty string
   YES → Continue

2. Is it pure formatting/whitespace?
   YES → style: format code
   NO  → Continue

3. Is it documentation only?
   YES → docs(<scope>): <subject>
   NO  → Continue

4. Does it add new functionality?
   YES → feat(<scope>): <subject>
   NO  → Continue

5. Does it fix a bug?
   YES → fix(<scope>): <subject>
   NO  → Continue

6. Does it improve performance?
   YES → perf(<scope>): <subject>
   NO  → Continue

7. Does it restructure without behavior change?
   YES → refactor(<scope>): <subject>
   NO  → Continue

8. Default → chore(<scope>): <subject>
```

---

## ✅ Quality Checklist

Before outputting, verify:

- [ ] Type is correct for the change
- [ ] Scope is accurate and concise
- [ ] Subject is imperative and ≤50 chars
- [ ] No trailing period in subject
- [ ] Body adds value (or is omitted)
- [ ] Breaking changes are flagged
- [ ] Message is professional and clear

---

## 📚 Examples

### Simple feature

```
feat(sidebar): add collapsible navigation groups
```

### Bug fix with context

```
fix(breadcrumbs): resolve missing index page URLs

Index pages from folders were not appearing in breadcrumb
navigation due to incorrect URL resolution logic.
```

### Breaking change

```
feat(api)!: change user response structure

Update /api/users to return nested profile object instead of
flat structure. This enables avatar support without additional
API calls.

BREAKING CHANGE: displayName moved to profile.name. Clients
must update to use the new response structure.
```

### Multi-file refactor

```
refactor(lib): consolidate sidebar utilities

Merge sortPageTree and convertTreeToNav into unified module.
Improves maintainability and reduces code duplication.

Affected files:
- lib/sidebar-utils.ts
- lib/source.ts
```

### Documentation update

```
docs(readme): update installation instructions
```

### Chore/maintenance

```
chore(deps): upgrade next.js to 16.1.4
```

### Style/formatting

```
style: apply prettier formatting
```

---

## ⚠️ Edge Cases

| Situation               | Action                               |
| ----------------------- | ------------------------------------ |
| No staged files         | Return empty string                  |
| Only lock files changed | `chore(deps): update dependencies`   |
| Generated files only    | `build: regenerate artifacts`        |
| Config + code mixed     | Focus on code change, mention config |
| Revert commit           | `revert: <original subject>`         |

---

## 🚫 Never Do

- ❌ Include explanations outside the commit message
- ❌ Use past tense ("added", "fixed")
- ❌ Start with capital letter after colon
- ❌ End subject with period
- ❌ Exceed 50 chars in subject
- ❌ Use vague subjects ("update code", "fix stuff")
- ❌ Invent new commit types
- ❌ Include file paths in subject (use body)

---

## 🎬 Execution

Upon receiving staged changes:

1. **Analyze** all staged files and diffs
2. **Classify** the primary change type
3. **Determine** appropriate scope
4. **Compose** subject line (imperative, ≤50 chars)
5. **Add body** if needed for context
6. **Add footer** for breaking changes or refs
7. **Output** ONLY the final commit message
