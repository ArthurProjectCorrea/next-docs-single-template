# Next Docs Single Template

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.18-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A520.9.0-339933?style=flat-square&logo=nodedotjs&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Semantic Release](https://img.shields.io/badge/Semantic%20Release-21.0.0-e10079?style=flat-square)
![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?style=flat-square&logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-3.8.1-F7B93E?style=flat-square&logo=prettier)

**🚀 Sistema profissional de documentação com componentes acessíveis, busca full-text e suporte multi-idioma**

[Características](#características) • [Stack Tecnológico](#stack-tecnológico) • [Estrutura](#estrutura-de-pastas) • [Contribuir](#contribuindo)

</div>

---

## 📖 Sobre

Um template de **produção enterprise** para criar documentação dinâmica, bases de conhecimento e sites corporativos modernos. Oferece processamento MDX em tempo de build, navegação inteligente, busca full-text zero-latência, suporte multi-idioma, componentes acessíveis (WCAG 2.1) e pipelines de qualidade automatizados via CI/CD.

**Perfeito para:**

- 📚 Documentação de APIs e SDKs
- 🏗️ Documentação técnica de sistemas
- 📖 Bases de conhecimento corporativas
- 🎓 Portais educacionais
- 📝 Blogs técnicos com estrutura complexa

---

## ✨ Características Principais

<table>
<tr>
<td width="50%">

### 🎨 Design System Profissional

- **Tema personalizável** via CSS variables (oklch)
- **Dark/Light mode** automático
- **30+ componentes** acessíveis (Radix UI)
- **WCAG 2.1** Level AA certified

</td>
<td width="50%">

### 🔍 Busca Inteligente

- Busca **full-text** zero-latência
- Indexação em **build-time**
- Filtro por versão automático
- **Command Palette** (Cmd+K)

</td>
</tr>
<tr>
<td width="50%">

### 📚 Documentação Dinâmica

- **MDX** full-stack com componentes React
- **Navegação automática** (sidebars)
- **Table of Contents** inteligente
- **Deep linking** com anchors

</td>
<td width="50%">

### 🌍 Multi-idioma

- Suporte a múltiplos idiomas
- Roteamento automático por locale
- Sistema de dicionários centralizado
- Seletor de idioma integrado

</td>
</tr>
<tr>
<td width="50%">

### ⚡ Performance

- **Turbopack** (5x mais rápido)
- **SSG** para documentação estática
- **ISR** para atualizações
- Code-splitting automático

</td>
<td width="50%">

### 🛡️ Qualidade Garantida

- **ESLint + Prettier** em pre-commit
- **TypeScript** strict mode
- **Semantic Release** automático
- **GitHub Actions** CI/CD

</td>
</tr>
</table>

---

## 🛠️ Stack Tecnológico

### Frontend Framework

| Tecnologia               | Versão  |
| ------------------------ | ------- |
| **Next.js (App Router)** | 16.1.4  |
| **React**                | 19.2.3  |
| **TypeScript**           | 5.x     |
| **Node.js**              | ≥20.9.0 |

### Design & Styling

| Tecnologia              | Versão |
| ----------------------- | ------ |
| **Tailwind CSS**        | 4.1.18 |
| **Tailwind Typography** | 0.5.19 |
| **Prettier**            | 3.8.1  |
| **tw-animate-css**      | 1.4.0  |

### UI & Acessibilidade

| Biblioteca               | Versão  |
| ------------------------ | ------- |
| **shadcn/ui (Radix UI)** | ~1.x    |
| **Lucide React**         | 0.563.0 |
| **cmdk**                 | 1.1.1   |
| **Embla Carousel**       | 8.6.0   |
| **React Day Picker**     | 9.13.0  |
| **Sonner**               | 2.0.7   |
| **Recharts**             | 2.15.4  |

### Documentation & MDX

| Ferramenta        | Versão  |
| ----------------- | ------- |
| **Fumadocs MDX**  | 14.2.6  |
| **Fumadocs Core** | 16.4.11 |
| **@next/mdx**     | 16.1.6  |
| **Rehype Slug**   | 6.0.0   |

### Quality & DevOps

| Ferramenta           | Versão |
| -------------------- | ------ |
| **ESLint**           | 9.x    |
| **Lefthook**         | 2.0.15 |
| **lint-staged**      | 16.2.7 |
| **Semantic Release** | 21.0.0 |

### Forms & Validation

| Biblioteca              | Versão |
| ----------------------- | ------ |
| **React Hook Form**     | 7.71.1 |
| **Zod**                 | 4.3.6  |
| **@hookform/resolvers** | 5.2.2  |

### Utilities

| Biblioteca                   | Versão |
| ---------------------------- | ------ |
| **next-themes**              | 0.4.6  |
| **nextjs-toploader**         | 3.9.17 |
| **Vaul**                     | 1.1.2  |
| **React Resizable Panels**   | 4.5.1  |
| **TailwindMerge**            | 3.4.0  |
| **clsx**                     | 2.1.1  |
| **date-fns**                 | 4.1.0  |
| **class-variance-authority** | 0.7.1  |

---

## 🏗️ Arquitetura

### Padrão de Desenvolvimento

```
┌─────────────────────────────────────┐
│   Next.js App Router (SSR/SSG)      │
├─────────────────────────────────────┤
│   Server Components (Data Fetching) │
│   + Client Components (Interactivity)
├─────────────────────────────────────┤
│   MDX Processing (Fumadocs)         │
│   + Full-text Search Index          │
├─────────────────────────────────────┤
│   Tailwind CSS + shadcn/ui          │
│   (30+ Accessible Components)       │
├─────────────────────────────────────┤
│   TypeScript + ESLint + Prettier    │
│   (Quality Gates)                   │
└─────────────────────────────────────┘
```

### Fluxo de Compilação

```mermaid
MDX Files → Fumadocs Compiler → Static HTML
         → Search Index (JSON)
         → Navigation Tree
         → Type-safe Routes
```

---

## 📂 Estrutura de Pastas

```
next-docs-single-template/
├── 📦 app/                         # Next.js App Router
│   ├── globals.css                 # CSS Variables + Base Styles
│   ├── layout.tsx                  # Root Layout + Providers
│   ├── [locale]/                   # Locale-based Routing
│   │   ├── layout.tsx              # Locale Layout
│   │   ├── page.tsx                # Home Page
│   │   └── docs/                   # Documentation Pages
│   │       ├── layout.tsx          # Docs Layout + Sidebar
│   │       └── [[...slug]]/        # Dynamic MDX Routes
│   └── api/search/                 # Full-text Search Endpoint
│
├── 🎨 components/                  # Project Components
│   ├── app-header.tsx              # Header + Navigation
│   ├── app-search.tsx              # Command Palette
│   ├── app-version-switcher.tsx    # Version Selector
│   ├── doc-sidebar.tsx             # Docs Navigation
│   ├── doc-toc.tsx                 # Table of Contents
│   ├── language-switcher.tsx       # i18n Language Selector
│   └── ui/                         # shadcn/ui Primitives (Radix UI)
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       └── ... (30+ components)
│
├── 📚 content/                     # Documentation Content
│   └── docs/
│       ├── en/                     # English Docs
│       │   ├── index.mdx
│       │   └── ...
│       └── pt/                     # Portuguese Docs
│           ├── index.mdx
│           └── ...
│
├── 🔗 contexts/                    # React Context State
│   ├── page-content.tsx            # Page Content Context
│   └── toc-context.tsx             # TOC Navigation Context
│
├── 📖 docs/                        # Documentation Files
│   ├── shadcn-ui/                  # Component API Docs
│   └── fumadocs/                   # Integration Guides
│
├── 🪝 hooks/                       # Custom React Hooks
│   ├── use-mobile.ts               # Mobile Detection
│   ├── use-toc.ts                  # TOC Navigation
│   └── ...
│
├── 🛠️ lib/                         # Utilities & Helpers
│   ├── source.ts                   # MDX Source Loader
│   ├── sidebar-utils.ts            # Navigation Generation
│   ├── search-utils.ts             # Search Indexing
│   ├── dictionaries.ts             # i18n Management
│   └── utils.ts                    # General Helpers
│
├── 📝 types/                       # TypeScript Definitions
│   ├── sidebar.ts                  # Navigation Types
│   ├── search.ts                   # Search Types
│   └── global.d.ts                 # Global Types
│
├── 🌐 public/                      # Static Assets
│   └── ...
│
├── ⚙️ .github/                     # GitHub Configuration
│   ├── workflows/                  # CI/CD Pipelines
│   └── instructions/               # Development Guidelines
│
├── 🎯 Configuration Files
│   ├── package.json                # Dependencies & Scripts
│   ├── tsconfig.json               # TypeScript Config
│   ├── next.config.mjs             # Next.js Config
│   ├── tailwind.config.js          # Tailwind Theme
│   ├── source.config.ts            # MDX Frontmatter Schema
│   ├── eslint.config.mjs           # Linting Rules
│   ├── postcss.config.mjs          # PostCSS Config
│   └── prettier.config.js          # Formatting Rules
│
└── 📄 Documentation
    ├── README.md                   # This File
    ├── CHANGELOG.md                # Version History
    └── LICENSE                     # MIT License
```

---

## 🔑 Recursos Avançados

### 🔍 Search Engine

- **Full-text indexing** em build-time
- **Zero-latency queries** (JSON estático)
- **Filtro por versão** automático
- Endpoint: `/api/search`

### 🌍 Internacionalização (i18n)

- Suporte multi-idioma nativo
- Roteamento por locale: `/[locale]/docs/...`
- Dicionários centralizados
- Language Switcher integrado

### 📊 Componentes Avançados

- **Sidebars colapsáveis** com persistência
- **Breadcrumbs automáticos**
- **Progress indicators** de leitura
- **Copy-to-clipboard** para códigos
- **Gráficos interativos** (Recharts)
- **Modais acessíveis** (Dialog, Drawer)

### 🔐 Segurança

- **CSP headers** configurados
- **HSTS** enabled
- **X-Frame-Options** protegido
- **XSS protection** via React
- **CORS** configurável

### 📱 Mobile-First

- Responsive em todos os breakpoints
- Touch-friendly components
- Sidebar adaptativos
- Modo dark/light automático

---

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor com HMR
npm run build        # Build de produção
npm run start        # Inicia servidor produção

# Qualidade de Código
npm run lint         # ESLint validation
npm run format       # Prettier + Tailwind ordering
npm run prepare      # Instala git hooks

# CI/CD (GitHub Actions)
npm run release      # Semantic Release (main branch)
```

---

## 🎯 Casos de Uso

| Caso                  | Descrição                                         |
| --------------------- | ------------------------------------------------- |
| 📚 **API Docs**       | Documentação automática de endpoints REST/GraphQL |
| 🏗️ **Architecture**   | Diagramas e especificações de sistemas            |
| 🔐 **Security Docs**  | Guias de boas práticas e compliance               |
| 📖 **Knowledge Base** | Base de conhecimento corporativa                  |
| 🎓 **Training**       | Plataforma educacional e tutoriais                |
| 📝 **Changelog**      | Histórico de versões com busca                    |
| 🛠️ **SDK Guide**      | Documentação de bibliotecas/SDKs                  |

---

## 🔄 CI/CD & Releases

### GitHub Actions

- ✅ **Push**: ESLint + Prettier check
- ✅ **Pull Requests**: Full build validation
- ✅ **Main branch**: Semantic Release automático
- 📦 **Artifacts**: Build output e changelogs

### Versionamento

Usa **Conventional Commits** + **Semantic Release**:

```bash
git commit -m "feat: nova funcionalidade"     # MINOR
git commit -m "fix: corrige bug"              # PATCH
git commit -m "feat!: breaking change"        # MAJOR
```

Releases automáticas são criadas com CHANGELOG gerado.

---

## 📋 Checklist de Desenvolvimento

- [ ] Clone o repositório e instale dependências
- [ ] Execute `npm run prepare` para git hooks
- [ ] Crie branch: `git checkout -b feature/seu-recurso`
- [ ] Faça alterações e teste localmente
- [ ] ESLint e Prettier rodam automaticamente em pre-commit
- [ ] Commit com mensagens semânticas
- [ ] Abra PR com descrição clara
- [ ] Mergeado em `main` gera release automática

---

## 📚 Documentação Interna

- **[Instruções de Componentes](/.github/instructions/components.instructions.md)** - Padrões de componentes
- **[Guia para IA/Copilot](/.github/copilot-instructions.md)** - Contexto de arquitetura
- **[Documentação shadcn/ui](/docs/shadcn-ui/)** - API dos componentes
- **[Guias Fumadocs](/docs/fumadocs/)** - Integração MDX/Search

---

## 💡 Boas Práticas

✅ **Do's**

- Use composição com componentes `ui/` existentes
- Crie novos componentes em `components/`
- Siga Conventional Commits
- Sempre use tipos TypeScript
- Documente componentes novos

❌ **Don'ts**

- Nunca modifique `components/ui/` (terceiros)
- Não use cores hardcoded (use design tokens)
- Não comite sem passar eslint/prettier
- Não misture server/client components
- Não deixe tipos `any` sem motivo

---

## 📊 Estatísticas

| Métrica                     | Valor    |
| --------------------------- | -------- |
| **Componentes UI**          | 30+      |
| **Ícones Disponíveis**      | 560+     |
| **Build Speed (Turbopack)** | ~2-5s    |
| **Lighthouse Score**        | 95+      |
| **Mobile Friendly**         | ✅       |
| **Accessibility (WCAG)**    | Level AA |
| **Type Coverage**           | 100%     |

---

## 🤝 Suporte & Contribuições

Para dúvidas ou contribuições:

1. Consulte a [documentação interna](/.github/copilot-instructions.md)
2. Abra uma issue com contexto claro
3. Faça um PR seguindo as convenções
4. Reviewers validarão contra guidelines

---

## 📄 Licença

MIT © 2024 - Consulte [LICENSE](./LICENSE) para detalhes.

---

<div align="center">

**Desenvolvido com ❤️ para velocidade, qualidade e acessibilidade**

[⬆ Voltar ao Topo](#)

</div>
