# next-template

📦 Projeto template Next.js com TypeScript, Tailwind e componentes shadcn UI

## 🚀 Primeiros passos (em Português)

Siga estes passos rápidos após clonar o repositório.

1. Clone o repositório:

```bash
git clone <REPO_URL>
cd next-template
```

2. (Opcional / conforme solicitado) Renomeie o último commit para padronizar a mensagem inicial:

> **Atenção:** modificar o último commit reescreve o histórico local. Se o commit já foi enviado ao remoto, será necessário forçar o push (use com cuidado).

```bash
git commit --amend -m "chore: first commit"
# Se precisar atualizar o remoto (somente quando souber o que está fazendo):
# git push --force-with-lease origin <branch>
```

3. Instale as dependências e prepare hooks:

```bash
npm install
npm run prepare   # instala os git hooks (lefthook)
```

4. Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

5. Verificações e boas práticas locais:

- Formatar o código: `npm run format`
- Rodar linter: `npm run lint`
- Build de produção: `npm run build`
- (Se aplicável) Rodar testes: `npm test`
- Executar hooks manualmente: `npx lefthook run pre-commit`

---

## 🧭 Breve descrição da stack deste template

Este template foi montado para ser um ponto de partida moderno com foco em produtividade e consistência:

- **Next.js (App Router)** — SSR, rotas, otimizações de build.
- **TypeScript** — tipagem estática para maior segurança e DX.
- **Tailwind CSS** — utilitários para estilização rápida.
- **shadcn UI primitives** — componentes acessíveis e reutilizáveis (localizados em `components/ui`).
- **next-themes** — suporte a dark/light mode.
- **nextjs-toploader** — indicador de carregamento global.
- **Lefthook + lint-staged** — git hooks e formatação/lint automático.
- **Prettier / ESLint** — formatação e regras de qualidade de código.

---

## 🔧 Boas práticas e foco em componentes nativos

**Use preferencialmente os componentes nativos do projeto** e siga as instruções de `docs/shadcn-ui`:

- Não adicione novos componentes diretamente em `components/ui` (esse diretório é reservado para implementações upstream); crie componentes reutilizáveis na raiz `components/`.
- Prefira **composição** e **wrappers** ao invés de duplicar comportamento.
- Sempre documente novos componentes em `docs/shadcn-ui` e adicione testes/accessibility quando necessário.

> Seguir essas práticas garante consistência visual, melhor manutenção, e compatibilidade com o sistema de design do projeto.

---

## ✅ Resumo rápido dos comandos úteis

```bash
# clonar
git clone <REPO_URL>
cd next-template

# alterar mensagem do último commit (local)
git commit --amend -m "chore: first commit"

# instalar, preparar hooks e rodar
after npm install
npm run prepare
npm run dev

# qualidade
npm run format
npm run lint
npm run build
```

## 🔁 Releases automatizados

This repository uses `semantic-release` to cut releases automatically from CI. Currently, **npm publishing is disabled by default** (the release job creates GitHub releases and a changelog but does not publish to npm).

If you want to enable npm publishing, update `release.config.js` to add `@semantic-release/npm` and set `npmPublish: true`, then configure the following repository secret in GitHub:

- `NPM_TOKEN` — for npm publish (only required if you enable npm publishing).
- `GITHUB_TOKEN` — automatically provided by GitHub Actions (used to create releases and release notes).

Permissions & tokens

- The release workflow requires write permissions to push changelogs/tags and to create issues; the workflow now sets:

```yaml
permissions:
  contents: write
  issues: write
  pull-requests: write
```

- If you have branch protection enabled on `main`, go to the branch protection rules and enable **Allow GitHub Actions to push to this branch** (or use a personal access token). If Actions cannot push due to protection rules, semantic-release will fail.

- If you need broader permissions (e.g., push across forks or special enterprise restrictions), create a Personal Access Token with `repo` scope and add it as a repository secret named `SEMANTIC_RELEASE_TOKEN`. The release workflow will use that token if present.

The release workflow is in `.github/workflows/release.yml` and runs on pushes to `main`.

Se precisar de ajuda com algo específico, abra uma issue ou envie uma PR com a proposta — e obrigado por contribuir! ✨
