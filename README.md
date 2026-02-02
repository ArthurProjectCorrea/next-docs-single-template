# Next Docs Single Template

🚀 **Template moderno para documentação, blogs e sites informativos** construído com Next.js 16, React 19 e ferramentas de ponta para desenvolvimento rápido, acessível e com qualidade garantida.

## 📖 Visão Geral

Um template de produção pronto para criar documentação dinâmica, sites corporativos e aplicações web modernas. Integra processamento MDX em tempo de build, navegação inteligente com busca, suporte a temas (light/dark), componentes acessíveis prontos para uso e pipelines de qualidade automatizados.

---

## 🛠️ Stack Tecnológico

### Infraestrutura & Build

| Tecnologia               | Versão  | Propósito                                             |
| ------------------------ | ------- | ----------------------------------------------------- |
| **Next.js (App Router)** | 16.1.4  | SSR/SSG, rotas, otimizações de build com Turbopack    |
| **React**                | 19.2.3  | UI declarativa com hooks modernos e Server Components |
| **TypeScript**           | 5.x     | Tipagem estática para segurança em desenvolvimento    |
| **Node.js**              | ≥20.9.0 | Runtime otimizado                                     |

### Design & Estilo

| Tecnologia              | Versão | Propósito                                                     |
| ----------------------- | ------ | ------------------------------------------------------------- |
| **Tailwind CSS**        | 4.1.18 | Framework utilitário com theme-aware colors via CSS variables |
| **Tailwind Typography** | 0.5.19 | Estilos tipográficos automáticos para conteúdo MDX/prose      |
| **Prettier**            | 3.8.1  | Formatação automática de código (plugin Tailwind incluído)    |
| **tw-animate-css**      | 1.4.0  | Biblioteca de animações CSS com integração Tailwind           |

### Componentes UI & Acessibilidade

| Biblioteca               | Versão  | Componentes                                                           |
| ------------------------ | ------- | --------------------------------------------------------------------- |
| **shadcn UI** (Radix UI) | ~1.x    | 30+ primitivos acessíveis (buttons, modals, dropdowns, sliders, etc.) |
| **Lucide React**         | 0.563.0 | 560+ ícones SVG otimizados                                            |
| **cmdk**                 | 1.1.1   | Componente command palette para navegação rápida                      |
| **Embla Carousel**       | 8.6.0   | Carrossel responsivo com suporte a touch                              |
| **React Day Picker**     | 9.13.0  | Seletor de data acessível                                             |
| **Sonner**               | 2.0.7   | Toast notifications elegantes e rápidas                               |
| **Recharts**             | 2.15.4  | Gráficos responsivos e interativos                                    |

### Documentação Dinâmica

| Ferramenta        | Versão  | Capacidade                                                                 |
| ----------------- | ------- | -------------------------------------------------------------------------- |
| **Fumadocs MDX**  | 14.2.6  | Compilação e processamento de arquivos MDX em tempo de build               |
| **Fumadocs Core** | 16.4.11 | Geração automática de TOC (Table of Contents), busca full-text, roteamento |
| **@next/mdx**     | 16.1.6  | Integração nativa MDX com Next.js App Router                               |
| **Rehype Slug**   | 6.0.0   | Geração automática de slugs em headings para deep links                    |

### Qualidade & Developer Experience

| Ferramenta           | Versão | Função                                               |
| -------------------- | ------ | ---------------------------------------------------- |
| **ESLint**           | 9.x    | Linting com regras Next.js e TypeScript              |
| **Lefthook**         | 2.0.15 | Git hooks performáticos (pré-commit, pré-push)       |
| **lint-staged**      | 16.2.7 | Executa linting/formatting apenas em arquivos staged |
| **Semantic Release** | 21.0.0 | Versionamento automático via Conventional Commits    |

### Formulários & Validação

| Biblioteca              | Versão | Propósito                                        |
| ----------------------- | ------ | ------------------------------------------------ |
| **React Hook Form**     | 7.71.1 | Gerenciamento eficiente de estado de formulários |
| **Zod**                 | 4.3.6  | Validação TypeScript-first com esquemas tipados  |
| **@hookform/resolvers** | 5.2.2  | Integração Zod + React Hook Form                 |

### Utilitários & UX

| Biblioteca                   | Versão | Uso                                         |
| ---------------------------- | ------ | ------------------------------------------- |
| **next-themes**              | 0.4.6  | Dark/light mode com persistência automática |
| **nextjs-toploader**         | 3.9.17 | Indicador de carregamento visual de páginas |
| **Vaul**                     | 1.1.2  | Drawer/sheet responsivo                     |
| **React Resizable Panels**   | 4.5.1  | Painéis redimensionáveis (split view)       |
| **TailwindMerge**            | 3.4.0  | Merge inteligente de classes Tailwind       |
| **clsx**                     | 2.1.1  | Construção condicional de classNames        |
| **date-fns**                 | 4.1.0  | Manipulação e formatação de datas           |
| **class-variance-authority** | 0.7.1  | Composição de variantes de componentes      |

---

## ✨ Recursos Principais

### 🎨 Design System Integrado

- **Tema customizável** via CSS variables (oklch colors)
- **Light/Dark mode** automático com suporte a preferências do SO
- **Componentes acessíveis** certificados com WCAG 2.1 (Radix UI)
- **Tipografia responsiva** com escala harmônica e suporte a múltiplos idiomas

### 📚 Documentação Dinâmica

- **MDX full-stack**: escrever documentação com componentes React
- **Navegação automática**: geração de sidebars e árvore de páginas
- **Busca full-text**: índice gerado em build-time para zero latência
- **Table of Contents inteligente**: navegação por seções com scroll automático
- **Deep linking**: URLs com hash para seções específicas

### 🔍 Busca & Navegação

- **API `/api/search`**: endpoint otimizado para busca de conteúdo
- **Comando palette (Cmd+K)**: navegação rápida por páginas
- **Breadcrumbs automáticos**: contexto de navegação em tempo real
- **Progress indicator**: barra visual de leitura em documentos

### 🎯 Performance & Segurança

- **Build otimizado**: Turbopack 5x mais rápido que webpack
- **Estratégia de cache**: SSG para docs + ISR para updates
- **Headers de segurança**: HSTS, CSP, X-Frame-Options configurados
- **Code splitting automático**: carregamento de modules sob demanda
- **Imagens otimizadas**: Next.js Image component com lazy loading

### 📱 Responsividade Garantida

- **Mobile-first design**: sidebars colapsáveis, navegação em sheet
- **Breakpoints consistentes**: Tailwind breakpoints (sm, md, lg, xl, 2xl)
- **Touch-friendly**: componentes otimizados para mobile
- **Viewport dinâmico**: suporte a `100svh` e scroll padding automático

### 🔄 Developer Experience

- **Git hooks automáticos**: ESLint + Prettier em cada commit
- **Live reload**: HMR (Hot Module Replacement) nativo
- **Type safety**: TypeScript strict mode em toda base
- **Auto-formatting**: Prettier com plugin Tailwind para class ordering

### 🚀 Deploy & CI/CD

- **Semantic Release**: versionamento automático (major.minor.patch)
- **GitHub Actions**: build, lint, format validados em CI
- **Releases automáticas**: changelog gerado automaticamente
- **Preview deployments**: suporte integrado para Vercel

---

## 🚀 Quick Start

### 1. Clone e instale

```bash
git clone <REPO_URL>
cd next-docs-single-template
npm install
npm run prepare  # instala git hooks
```

### 2. Inicie o dev server

```bash
npm run dev
# Acesse http://localhost:3000
```

### 3. Qualidade local

```bash
npm run format    # Prettier + Tailwind ordering
npm run lint      # ESLint com fix automático
npm run build     # Build de produção (valida types)
```

### 4. Deploy

```bash
npm run release   # Semantic release (CI only)
# ou
npm run build && npm run start
```

---

## 📂 Estrutura de Pastas

```
.
├── app/                    # Next.js App Router (routes & layouts)
│   ├── layout.tsx         # Root layout com ThemeProvider
│   ├── page.tsx           # Home page
│   ├── docs/              # Documentação (dinâmica)
│   │   ├── layout.tsx     # Sidebar + TOC provider
│   │   └── [[...slug]]/   # Catch-all para páginas MDX
│   ├── api/search/        # Search endpoint
│   └── globals.css        # CSS variables + base styles
│
├── components/            # Componentes do projeto (não ui/)
│   ├── app-header.tsx     # Header com navigation
│   ├── app-search.tsx     # Command palette
│   ├── doc-sidebar.tsx    # Sidebar de docs
│   ├── doc-toc.tsx        # Table of contents
│   └── ui/                # shadcn primitivos (Radix UI)
│
├── contexts/              # React contexts (state management)
│   ├── page-content.tsx   # Context para TOC
│   └── toc-context.tsx    # Context para navegação
│
├── content/docs/          # Arquivos MDX de documentação
│
├── docs/                  # Documentação sobre componentes
│   ├── shadcn-ui/         # API dos componentes UI
│   └── fumadocs/          # Guias de integração
│
├── hooks/                 # React hooks customizados
│   └── use-mobile.ts      # Hook para detectar mobile
│
├── lib/                   # Utilitários & helpers
│   ├── source.ts          # Fumadocs loader
│   └── utils.ts           # cn() e helpers gerais
│
├── types/                 # Type definitions globais
│   └── global.d.ts        # Tipos customizados
│
├── .github/               # GitHub Actions & automação
│   └── workflows/         # CI/CD pipelines
│
└── tailwind.config.js     # Theme variables & extend
```

---

## 🔧 Boas Práticas

### Componentes

- ✅ Crie novos componentes em `components/` (não em `ui/`)
- ✅ Use composição com componentes `ui/` existentes
- ✅ Documente em `docs/shadcn-ui/ComponentName.md`

### Estilos

- ✅ Use tokens CSS: `bg-primary`, `text-foreground`, `border-border`
- ✅ Nunca use cores hardcoded (`bg-black`, `#fff`, etc.)
- ✅ Tailwind ordering: `prettier --write .` (plugin incluso)

### MDX & Documentação

- ✅ Organize em `content/docs/` com estrutura de pastas
- ✅ Adicione frontmatter: `title`, `description`, `order`
- ✅ Use heading tags H2+ para auto-TOC

### Git

- ✅ Commits semânticos: `feat:`, `fix:`, `docs:`, etc.
- ✅ ESLint + Prettier rodam automaticamente em pre-commit
- ✅ Semantic Release cria releases automáticas em `main`

---

## 📦 Versões Principais

```json
{
  "next": "16.1.4",
  "react": "19.2.3",
  "typescript": "5.x",
  "tailwindcss": "4.1.18",
  "shadcn/ui (radix)": "~1.x",
  "fumadocs": "14.2.6+",
  "eslint": "9.x",
  "prettier": "3.8.1"
}
```

---

## 🔁 Releases & CI/CD

Este repositório usa **Semantic Release** para versionamento automático:

- **Commits** seguem Conventional Commits (`feat:`, `fix:`, etc.)
- **Releases** são criadas automaticamente em `main`
- **Changelog** gerado automaticamente
- **npm publish** desabilitado por padrão (apenas GitHub releases)

**Para ativar npm publishing:**

```javascript
// release.config.js
module.exports = {
  plugins: [
    // ...
    ['@semantic-release/npm', { npmPublish: true }],
  ],
};
// Adicionar NPM_TOKEN secret no GitHub
```

---

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feature/meu-recurso`
2. Faça suas mudanças e teste
3. Commit semântico: `git commit -m "feat: novo recurso"`
4. Hooks automáticos verificam eslint/prettier
5. Abra um PR com descrição clara

---

## 📄 Licença

MIT — veja [LICENSE](LICENSE) para detalhes.

---

**Para mais detalhes**, consulte:

- [Instruções de Componentes](/.github/instructions/components.instructions.md)
- [Instruções para Copilot](/.github/copilot-instructions.md)
- [Documentação de Componentes](/docs/shadcn-ui/)
- [Guias Fumadocs](/docs/fumadocs/)

Desenvolvido com ❤️ para velocidade, qualidade e acessibilidade.
