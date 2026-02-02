# Fumadocs (Framework Mode): Orama (default)

URL: /docs/search/orama
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/(framework)/search/orama.mdx

The default search engine powered by Orama.

Overview [#overview]

<FeedbackBlock id="8f7396b67a1f1cd7" body="Fumadocs configures Orama search engine out-of-the-box.">
  Fumadocs configures [Orama search engine](/docs/headless/search/orama) out-of-the-box.
</FeedbackBlock>

<FeedbackBlock id="e6e4f5aac5accad3" body="It works through a API endpoint (running on server), or a statically cached JSON file for static websites.">
  It works through a API endpoint (running on server), or a statically cached JSON file for static websites.
</FeedbackBlock>

Setup [#setup]

<FeedbackBlock id="01dbccb90948b96a" body="Create a search dialog.">
  Create a search dialog.
</FeedbackBlock>

<Tabs items={['fetch (default)', 'static']}>
<Tab>
The UI has been configured by default, you can also re-create it for further customisations:

    ```tsx title="components/search.tsx"
    'use client';
    import { useDocsSearch } from 'fumadocs-core/search/client';
    import {
      SearchDialog,
      SearchDialogClose,
      SearchDialogContent,
      SearchDialogHeader,
      SearchDialogIcon,
      SearchDialogInput,
      SearchDialogList,
      SearchDialogOverlay,
      type SharedProps,
    } from 'fumadocs-ui/components/dialog/search';
    import { useI18n } from 'fumadocs-ui/contexts/i18n';

    export default function DefaultSearchDialog(props: SharedProps) {
      const { locale } = useI18n(); // (optional) for i18n
      const { search, setSearch, query } = useDocsSearch({
        type: 'fetch',
        locale,
      });

      return (
        <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
          <SearchDialogOverlay />
          <SearchDialogContent>
            <SearchDialogHeader>
              <SearchDialogIcon />
              <SearchDialogInput />
              <SearchDialogClose />
            </SearchDialogHeader>
            <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
          </SearchDialogContent>
        </SearchDialog>
      );
    }

    ```

  </Tab>

  <Tab id="static">
    For Static Export, you can configure [static mode](/docs/headless/search/orama#static-export) on search server, and use the `static` client:

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
        npm install @orama/orama
        ```
      </CodeBlockTab>

      <CodeBlockTab value="pnpm">
        ```bash
        pnpm add @orama/orama
        ```
      </CodeBlockTab>

      <CodeBlockTab value="yarn">
        ```bash
        yarn add @orama/orama
        ```
      </CodeBlockTab>

      <CodeBlockTab value="bun">
        ```bash
        bun add @orama/orama
        ```
      </CodeBlockTab>
    </CodeBlockTabs>

    ```tsx title="components/search.tsx"
    'use client';
    import {
      SearchDialog,
      SearchDialogClose,
      SearchDialogContent,
      SearchDialogHeader,
      SearchDialogIcon,
      SearchDialogInput,
      SearchDialogList,
      SearchDialogOverlay,
      type SharedProps,
    } from 'fumadocs-ui/components/dialog/search';
    import { useDocsSearch } from 'fumadocs-core/search/client';
    import { create } from '@orama/orama';
    import { useI18n } from 'fumadocs-ui/contexts/i18n';

    function initOrama() {
      return create({
        schema: { _: 'string' },
        // https://docs.orama.com/docs/orama-js/supported-languages
        language: 'english',
      });
    }

    export default function DefaultSearchDialog(props: SharedProps) {
      const { locale } = useI18n(); // (optional) for i18n
      const { search, setSearch, query } = useDocsSearch({
        type: 'static',
        initOrama,
        locale,
      });

      return (
        <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
          <SearchDialogOverlay />
          <SearchDialogContent>
            <SearchDialogHeader>
              <SearchDialogIcon />
              <SearchDialogInput />
              <SearchDialogClose />
            </SearchDialogHeader>
            <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
          </SearchDialogContent>
        </SearchDialog>
      );
    }

    ```

  </Tab>
</Tabs>

Replace Search Dialog [#replace-search-dialog]

<FeedbackBlock id="0176c4209b9d8310" body="Replace the search dialog with yours from <RootProvider />:">
  Replace the search dialog with yours from [`<RootProvider />`](/docs/ui/root-provider):
</FeedbackBlock>

```tsx
import { RootProvider } from 'fumadocs-ui/provider/<framework>';
// [!code ++]
import SearchDialog from '@/components/search';

<RootProvider
  // [!code ++:3]
  search={{
    SearchDialog,
  }}
>
  {children}
</RootProvider>;
```

<FeedbackBlock id="37fcb4c8b8394fab" body="If it was in a server component, you would need a separate client component for provider to pass functions:">
  If it was in a server component, you would need a separate client component for provider to pass functions:
</FeedbackBlock>

<CodeBlockTabs defaultValue="provider.tsx">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="provider.tsx">
      provider.tsx
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="app/layout.tsx">
      app/layout.tsx
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="provider.tsx">
    ```tsx
    'use client';
    import { RootProvider } from 'fumadocs-ui/provider/<framework>';
    import SearchDialog from '@/components/search';
    import type { ReactNode } from 'react';

    export function Provider({ children }: { children: ReactNode }) {
      return (
        <RootProvider
          search={{
            SearchDialog,
          }}
        >
          {children}
        </RootProvider>
      );
    }
    ```

  </CodeBlockTab>

  <CodeBlockTab value="app/layout.tsx">
    ```tsx
    import { Provider } from './provider';
    import type { ReactNode } from 'react';

    export default function Layout({ children }: { children: ReactNode }) {
      return (
        <html lang="en">
          <body>
            {/* [!code --] */}
            <RootProvider>{children}</RootProvider>
            {/* [!code ++] */}
            <Provider>{children}</Provider>
          </body>
        </html>
      );
    }
    ```

  </CodeBlockTab>
</CodeBlockTabs>

Tag Filter [#tag-filter]

<FeedbackBlock id="8ddb9a20e77716a0" body="Optionally, you can add UI for filtering results by tags. Configure Tag Filter on search server and add the following:">
  Optionally, you can add UI for filtering results by tags. Configure [Tag Filter](/docs/headless/search/orama#tag-filter) on search server and add the following:
</FeedbackBlock>

```tsx
'use client';

import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogOverlay,
  type SharedProps,
  TagsList,
  TagsListItem,
} from 'fumadocs-ui/components/dialog/search';
import { useState } from 'react';
import { useDocsSearch } from 'fumadocs-core/search/client';

export default function CustomSearchDialog(props: SharedProps) {
  // [!code ++]
  const [tag, setTag] = useState<string | undefined>();
  const { search, setSearch, query } = useDocsSearch({
    tag, // [!code ++]
    // other options depending on your search engine
  });

  return (
    <SearchDialog>
      <SearchDialogOverlay />
      <SearchDialogContent>
        ...
        <SearchDialogFooter className="flex flex-row">
          {/* [!code ++:3] */}
          <TagsList tag={tag} onTagChange={setTag}>
            <TagsListItem value="my-value">My Value</TagsListItem>
          </TagsList>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}
```
