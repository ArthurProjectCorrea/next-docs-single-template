# Fumadocs Core (the core library of Fumadocs): Built-in Search

URL: /docs/headless/search/orama
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/headless/search/orama.mdx

Built-in document search of Fumadocs

<FeedbackBlock id="aec98c66026d590a" body="Fumadocs supports document search with Orama, It is the default but also the recommended option since it can be self-hosted and totally free.">
  Fumadocs supports document search with Orama, It is the default but also the recommended option since it can be self-hosted and totally free.
</FeedbackBlock>

Setup [#setup]

<FeedbackBlock id="abedb5613cdec4ee" body="Host the server for handling search requests.">
  Host the server for handling search requests.
</FeedbackBlock>

From Source [#from-source]

<FeedbackBlock id="be7c715598b5fc8a" body="Create the server from source object.">
  Create the server from source object.
</FeedbackBlock>

<CodeBlockTabs defaultValue="Next.js">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Next.js">
      Next.js
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="React Router">
      React Router
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Tanstack Start">
      Tanstack Start
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Waku">
      Waku
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="Next.js">
    ```ts  title="app/api/search/route.ts"
    import { source } from '@/lib/source';
    import { createFromSource } from 'fumadocs-core/search/server';

    export const { GET } = createFromSource(source, {
      // https://docs.orama.com/docs/orama-js/supported-languages
      language: 'english',
    });

    ```

  </CodeBlockTab>

  <CodeBlockTab value="React Router">
    ```ts  title="app/docs/search.ts"
    import type { Route } from './+types/search';
    import { createFromSource } from 'fumadocs-core/search/server';
    import { source } from '@/lib/source';

    const server = createFromSource(source, {
      // https://docs.orama.com/docs/orama-js/supported-languages
      language: 'english',
    });

    export async function loader({ request }: Route.LoaderArgs) {
      return server.GET(request);
    }

    ```

  </CodeBlockTab>

  <CodeBlockTab value="Tanstack Start">
    ```ts  title="src/routes/api/search.ts"
    import { createFileRoute } from '@tanstack/react-router';
    import { source } from '@/lib/source';
    import { createFromSource } from 'fumadocs-core/search/server';

    const server = createFromSource(source, {
      // https://docs.orama.com/docs/orama-js/supported-languages
      language: 'english',
    });

    export const Route = createFileRoute('/api/search')({
      server: {
        handlers: {
          GET: async ({ request }) => server.GET(request),
        },
      },
    });

    ```

  </CodeBlockTab>

  <CodeBlockTab value="Waku">
    ```ts  title="src/pages/api/search.ts"
    import { createFromSource } from 'fumadocs-core/search/server';
    import { source } from '@/lib/source';

    export const { GET } = createFromSource(source);

    ```

  </CodeBlockTab>
</CodeBlockTabs>

From Search Indexes [#from-search-indexes]

<FeedbackBlock id="48baf605d691cb53" body="Create the server from search indexes, each index needs a structuredData field.">
  Create the server from search indexes, each index needs a `structuredData` field.
</FeedbackBlock>

<FeedbackBlock id="50433e3e497ffbe7" body="Usually, it is provided by your content source (e.g. Fumadocs MDX). You can also extract it from Markdown/MDX document using the Remark Structure plugin.">
  Usually, it is provided by your content source (e.g. Fumadocs MDX). You can also extract it from Markdown/MDX document using the [Remark Structure](/docs/headless/mdx/structure) plugin.
</FeedbackBlock>

<CodeBlockTabs defaultValue="Next.js">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Next.js">
      Next.js
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="React Router">
      React Router
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Tanstack Start">
      Tanstack Start
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Waku">
      Waku
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="Next.js">
    ```ts  title="app/api/search/route.ts"
    import { source } from '@/lib/source';
    import { createSearchAPI } from 'fumadocs-core/search/server';

    export const { GET } = createSearchAPI('advanced', {
      language: 'english',
      indexes: source.getPages().map((page) => ({
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        id: page.url,
        structuredData: page.data.structuredData,
      })),
    });
    ```

  </CodeBlockTab>

  <CodeBlockTab value="React Router">
    ```ts  title="app/docs/search.ts"
    import type { Route } from './+types/search';
    import { createSearchAPI } from 'fumadocs-core/search/server';
    import { source } from '@/lib/source';

    const server = createSearchAPI('advanced', {
      language: 'english',
      indexes: source.getPages().map((page) => ({
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        id: page.url,
        structuredData: page.data.structuredData,
      })),
    });

    export async function loader({ request }: Route.LoaderArgs) {
      return server.GET(request);
    }
    ```

  </CodeBlockTab>

  <CodeBlockTab value="Tanstack Start">
    ```ts  title="src/routes/api/search.ts"
    import { createFileRoute } from '@tanstack/react-router';
    import { source } from '@/lib/source';
    import { createSearchAPI } from 'fumadocs-core/search/server';

    const server = createSearchAPI('advanced', {
      language: 'english',
      indexes: source.getPages().map((page) => ({
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        id: page.url,
        structuredData: page.data.structuredData,
      })),
    });

    export const Route = createFileRoute('/api/search')({
      server: {
        handlers: {
          GET: async ({ request }) => server.GET(request),
        },
      },
    });
    ```

  </CodeBlockTab>

  <CodeBlockTab value="Waku">
    ```ts  title="src/pages/api/search.ts"
    import { source } from '@/lib/source';
    import { createSearchAPI } from 'fumadocs-core/search/server';

    export const { GET } = createSearchAPI('advanced', {
      language: 'english',
      indexes: source.getPages().map((page) => ({
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        id: page.url,
        structuredData: page.data.structuredData,
      })),
    });
    ```

  </CodeBlockTab>
</CodeBlockTabs>

Searching Documents [#searching-documents]

<FeedbackBlock id="4c7d829b20a7b8f3" body="You can search documents using:">
  You can search documents using:
</FeedbackBlock>

<FeedbackBlock id="4cc241f8b75a35fe" body="Fumadocs UI: Supported out-of-the-box, see Search UI for details.Search Client:">
  * **Fumadocs UI**: Supported out-of-the-box, see [Search UI](/docs/search/orama) for details.
  * **Search Client**:
</FeedbackBlock>

```ts twoslash
import { useDocsSearch } from 'fumadocs-core/search/client';

const client = useDocsSearch({
  type: 'fetch',
});
```

<TypeTable
type={{
  "name": "$Fumadocs",
  "description": "",
  "entries": [
    {
      "name": "type",
      "description": "",
      "tags": [],
      "type": "\"fetch\"",
      "simplifiedType": "\"fetch\"",
      "required": true,
      "deprecated": false
    },
    {
      "name": "api",
      "description": "API route for search endpoint, support absolute URLs.",
      "tags": [
        {
          "name": "defaultValue",
          "text": "'/api/search'"
        }
      ],
      "type": "string | undefined",
      "simplifiedType": "string",
      "required": false,
      "deprecated": false
    },
    {
      "name": "tag",
      "description": "Filter results with specific tag(s).",
      "tags": [],
      "type": "string | string[] | undefined",
      "simplifiedType": "array | string",
      "required": false,
      "deprecated": false
    },
    {
      "name": "locale",
      "description": "Filter by locale",
      "tags": [],
      "type": "string | undefined",
      "simplifiedType": "string",
      "required": false,
      "deprecated": false
    }
  ]
}}
/>

Configurations [#configurations]

Tag Filter [#tag-filter]

<FeedbackBlock id="87dcaa5447836c12" body="Support filtering results by tag, it's useful for implementing multi-docs similar to this documentation.">
  Support filtering results by tag, it's useful for implementing multi-docs similar to this documentation.
</FeedbackBlock>

```ts
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

const server = createFromSource(source, {
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      // use your desired value, like page.slugs[0] [!code ++]
      tag: '<value>',
    };
  },
});
```

<FeedbackBlock id="492056cc63a592af" body="and update your search client:">
  and update your search client:
</FeedbackBlock>

<FeedbackBlock id="989c961eddb0c980" body="Fumadocs UI: Configure Tag Filter on Search UI.Search Client: pass a tag to the hook.">
  * **Fumadocs UI**: Configure [Tag Filter](/docs/search/orama#tag-filter) on Search UI.
  * **Search Client**: pass a tag to the hook.
</FeedbackBlock>

```ts
import { useDocsSearch } from 'fumadocs-core/search/client';

const client = useDocsSearch({
  type: 'fetch',
  tag: '<value>', // [!code ++]
});
```

Static Mode [#static-export]

<FeedbackBlock id="51b2294bdff874c3" body="To support usage with static site, use staticGET from search server and make the route static or pre-rendered.">
  To support usage with static site, use `staticGET` from search server and make the route static or pre-rendered.
</FeedbackBlock>

<CodeBlockTabs defaultValue="Next.js">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Next.js">
      Next.js
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="React Router">
      React Router
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Tanstack Start">
      Tanstack Start
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Waku">
      Waku
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="Next.js">
    ```ts  title="app/api/search/route.ts"
    import { source } from '@/lib/source';
    import { createFromSource } from 'fumadocs-core/search/server';

    // statically cached [!code highlight:2]
    export const revalidate = false;
    export const { staticGET: GET } = createFromSource(source);
    ```

  </CodeBlockTab>

  <CodeBlockTab value="React Router">
    ```ts  title="app/docs/search.ts"
    // make sure this route is pre-rendered in `react-router.config.ts`.
    export async function loader() {
      // [!code highlight]
      return server.staticGET();
    }
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Tanstack Start">
    ```ts  title="src/routes/api/search.ts"
    import { createFileRoute } from '@tanstack/react-router';

    export const Route = createFileRoute('/api/search')({
      server: {
        handlers: {
          // [!code highlight]
          GET: async () => server.staticGET(),
        },
      },
    });
    ```

    ```ts  title="vite.config.ts"
    import { tanstackStart } from '@tanstack/react-start/plugin/vite';
    import { defineConfig } from 'vite';

    export default defineConfig({
      plugins: [
        tanstackStart({
          prerender: {
            enabled: true,
          },
          // [!code ++] pre-render the index file
          pages: [{ path: '/api/search' }],
        }),
      ],
    });
    ```

  </CodeBlockTab>

  <CodeBlockTab value="Waku">
    ```ts  title="src/pages/api/search.ts"
    import { source } from '@/lib/source';
    import { createFromSource } from 'fumadocs-core/search/server';

    // [!code highlight]
    export const { staticGET: GET } = createFromSource(source);

    // statically cached [!code highlight:3]
    export const getConfig = async () => ({
      render: 'static',
    });
    ```

  </CodeBlockTab>
</CodeBlockTabs>

> <FeedbackBlock id="b69aef9f94fe731b" body="staticGET is also available on createSearchAPI.">
>   `staticGET` is also available on `createSearchAPI`.
> </FeedbackBlock>

<FeedbackBlock id="8805779a70a4d4e9" body="and update your search clients:">
  and update your search clients:
</FeedbackBlock>

<FeedbackBlock
id="08d58bf2ca4b8178"
body="Fumadocs UI: use static client on Search UI.Search Client: use static instead of fetch.import { useDocsSearch } from 'fumadocs-core/search/client';

const client = useDocsSearch({
type: 'static',
});"

>

- **Fumadocs UI**: use [static client](/docs/search/orama#static) on Search UI.

- **Search Client**: use `static` instead of `fetch`.

      ```ts
      import { useDocsSearch } from 'fumadocs-core/search/client';

      const client = useDocsSearch({
        type: 'static',
      });
      ```

      <TypeTable
        type={{
        "name": "$Fumadocs",
        "description": "",
        "entries": [
          {
            "name": "type",
            "description": "",
            "tags": [],
            "type": "\"static\"",
            "simplifiedType": "\"static\"",
            "required": true,
            "deprecated": false
          },
          {
            "name": "from",
            "description": "Where to download exported search indexes (URL)",
            "tags": [
              {
                "name": "defaultValue",
                "text": "'/api/search'"
              }
            ],
            "type": "string | undefined",
            "simplifiedType": "string",
            "required": false,
            "deprecated": false
          },
          {
            "name": "initOrama",
            "description": "",
            "tags": [],
            "type": "((locale?: string) => AnyOrama | Promise<AnyOrama>) | undefined",
            "simplifiedType": "function",
            "required": false,
            "deprecated": false
          },
          {
            "name": "tag",
            "description": "Filter results with specific tag(s).",
            "tags": [],
            "type": "string | string[] | undefined",
            "simplifiedType": "array | string",
            "required": false,
            "deprecated": false
          },
          {
            "name": "locale",
            "description": "Filter by locale (unsupported at the moment)",
            "tags": [],
            "type": "string | undefined",
            "simplifiedType": "string",
            "required": false,
            "deprecated": false
          }
        ]
      }}
      />

  </FeedbackBlock>

<Callout type="warn" title="Be Careful">
  Static Search requires clients to download the exported search indexes.
  For large docs sites, it can be expensive.

You should use cloud solutions like Orama Cloud or Algolia for these cases.
</Callout>

Internationalization [#internationalization]

<FeedbackBlock id="74a2cc58e355e579" body="Make sure your language is on the Orama Supported Languages list.">
  Make sure your language is on the Orama [Supported Languages](https://docs.orama.com/docs/orama-js/supported-languages) list.
</FeedbackBlock>

<CodeBlockTabs defaultValue="From Source">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="From Source">
      From Source
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="From Search Indexes">
      From Search Indexes
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="From Source">
    ```ts title="app/api/search/route.ts" 
    import { source } from '@/lib/source';
    import { createFromSource } from 'fumadocs-core/search/server';

    const server = createFromSource(source, {
      localeMap: {
        // [locale]: Orama options [!code ++:2]
        ru: { language: 'russian' },
        en: { language: 'english' },
      },
    });
    ```

  </CodeBlockTab>

  <CodeBlockTab value="From Search Indexes">
    ```ts
    import { source } from '@/lib/source';
    import { createI18nSearchAPI } from 'fumadocs-core/search/server';
    import { i18n } from '@/lib/i18n';

    const server = createI18nSearchAPI('advanced', {
      i18n, // [!code ++]
      indexes: source.getLanguages().flatMap(({ language, pages }) =>
        pages.map((page) => ({
          title: page.data.title,
          description: page.data.description,
          structuredData: page.data.structuredData,
          id: page.url,
          url: page.url,
          locale: language === 'ru' ? 'russian' : 'english', // [!code ++]
        })),
      ),
    });
    ```

  </CodeBlockTab>
</CodeBlockTabs>

<FeedbackBlock id="7cb9e68571af0685" body="For Static Mode, you should configure from client-side instead:">
  For **Static Mode**, you should configure from client-side instead:
</FeedbackBlock>

```tsx title="components/search.tsx"
import { useDocsSearch } from 'fumadocs-core/search/client';
import { create } from '@orama/orama';

function initOrama(locale?: string) {
  return create({
    schema: { _: 'string' },
    // [!code ++]
    language: locale === 'ru' ? 'russian' : 'english',
  });
}

function Search() {
  const client = useDocsSearch({
    type: 'static',
    initOrama,
  });

  // ...
}
```

Special Languages [#special-languages]

<FeedbackBlock id="2d1dbe9fa3ed765d" body="Chinese and Japanese require additional configurations:">
  Chinese and Japanese require additional configurations:
</FeedbackBlock>

<CodeBlockTabs defaultValue="npm" groupId="package-manager" persist>
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="npm">
      npm
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="pnpm">
      pnpm
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="yarn">
      yarn
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="bun">
      bun
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="npm">
    ```bash
    npm i @orama/tokenizers
    ```
  </CodeBlockTab>

  <CodeBlockTab value="pnpm">
    ```bash
    pnpm add @orama/tokenizers
    ```
  </CodeBlockTab>

  <CodeBlockTab value="yarn">
    ```bash
    yarn add @orama/tokenizers
    ```
  </CodeBlockTab>

  <CodeBlockTab value="bun">
    ```bash
    bun add @orama/tokenizers
    ```
  </CodeBlockTab>
</CodeBlockTabs>

<CodeBlockTabs defaultValue="createFromSource">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="createFromSource">
      createFromSource
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Static mode">
      Static mode
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="createFromSource">
    ```ts title="app/api/search/route.ts" 
    import { source } from '@/lib/source';
    import { createFromSource } from 'fumadocs-core/search/server';
    import { createTokenizer } from '@orama/tokenizers/mandarin';

    export const { GET } = createFromSource(source, {
      localeMap: {
        // [locale]: Orama options
        cn: {
          components: {
            tokenizer: createTokenizer(),
          },
          search: {
            threshold: 0,
            tolerance: 0,
          },
        },
      },
    });

    ```

  </CodeBlockTab>

  <CodeBlockTab value="Static mode">
    ```tsx  title="components/search.tsx"
    import { useDocsSearch } from 'fumadocs-core/search/client';
    import { createTokenizer } from '@orama/tokenizers/mandarin';
    import { create } from '@orama/orama';

    // [!code focus:8]
    function initOrama(locale?: string) {
      return create({
        schema: { _: 'string' },
        components: {
          tokenizer: locale === 'cn' ? createTokenizer() : undefined,
        },
      });
    }

    function Search() {
      const client = useDocsSearch({
        type: 'static',
        initOrama,
      });
      // ...
    }
    ```

  </CodeBlockTab>
</CodeBlockTabs>

<FeedbackBlock id="8805779a70a4d4e9-1" body="and update your search clients:">
  and update your search clients:
</FeedbackBlock>

<FeedbackBlock
id="5dc4ae35b8814347"
body="Fumadocs UI: No changes needed, Fumadocs UI handles this when you have i18n configured correctly.Search Client:
Add locale to the search client, this will only allow pages with specified locale to be searchable by the user."

>

- **Fumadocs UI**: No changes needed, Fumadocs UI handles this when you have i18n configured correctly.
- **Search Client**:
  Add `locale` to the search client, this will only allow pages with specified locale to be searchable by the user.
  </FeedbackBlock>

```ts
import { useDocsSearch } from 'fumadocs-core/search/client';

const { search, setSearch, query } = useDocsSearch({
  type: 'fetch',
  locale: 'cn',
});
```

Headless [#headless]

<FeedbackBlock id="98fbcb7383006f19" body="You can host the search server on other backend such as Express and Elysia.">
  You can host the search server on other backend such as Express and Elysia.
</FeedbackBlock>

```ts
import { initAdvancedSearch } from 'fumadocs-core/search/server';

const server = initAdvancedSearch({
  // you still have to pass indexes
});

server.search('query', {
  // you can specify `locale` and `tag` here
});
```
