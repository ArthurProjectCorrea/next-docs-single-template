# Fumadocs Core (the core library of Fumadocs): Breadcrumb

URL: /docs/headless/components/breadcrumb
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/headless/components/breadcrumb.mdx

The navigation component at the top of the screen

<FeedbackBlock id="ac11e3741a278ff9" body="A hook for implementing Breadcrumb in your documentation. It returns breadcrumb items for a page based on the given page tree.">
  A hook for implementing Breadcrumb in your documentation. It returns breadcrumb items for a page based on the given page tree.
</FeedbackBlock>

> <FeedbackBlock id="7b51f12879db20db" body="If present, the index page of a folder will be used as the item.">
>   If present, the index page of a folder will be used as the item.
> </FeedbackBlock>

Usage [#usage]

<FeedbackBlock id="096e38d0a039a5cc" body="It exports a useBreadcrumb hook:">
  It exports a `useBreadcrumb` hook:
</FeedbackBlock>

```ts twoslash
declare const tree: any;
import { usePathname } from 'next/navigation';
// ---cut---
import { useBreadcrumb } from 'fumadocs-core/breadcrumb';

// obtain `pathname` using the hook provided by your React framework.
const pathname = usePathname();
const items = useBreadcrumb(pathname, tree);
//    ^?
```

Example [#example]

<FeedbackBlock id="badf8c883cef5b4f" body="A styled example for Next.js.">
  A styled example for Next.js.
</FeedbackBlock>

```tsx
'use client';
import { usePathname } from 'next/navigation';
import { useBreadcrumb } from 'fumadocs-core/breadcrumb';
import type { PageTree } from 'fumadocs-core/page-tree';
import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function Breadcrumb({ tree }: { tree: PageTree.Root }) {
  const pathname = usePathname();
  const items = useBreadcrumb(pathname, tree);

  if (items.length === 0) return null;

  return (
    <div className="-mb-3 flex flex-row items-center gap-1 text-sm font-medium text-fd-muted-foreground">
      {items.map((item, i) => (
        <Fragment key={i}>
          {i !== 0 && (
            <ChevronRight className="size-4 shrink-0 rtl:rotate-180" />
          )}
          {item.url ? (
            <Link
              href={item.url}
              className="truncate hover:text-fd-accent-foreground"
            >
              {item.name}
            </Link>
          ) : (
            <span className="truncate">{item.name}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
```

<FeedbackBlock id="76e50aee99ad3fff" body="You can use it by passing the page tree via tree prop in a server component.">
  You can use it by passing the page tree via `tree` prop in a server component.
</FeedbackBlock>

Breadcrumb Item [#breadcrumb-item]

<TypeTable
type={{
  "name": "BreadcrumbItem",
  "description": "",
  "entries": [
    {
      "name": "name",
      "description": "",
      "tags": [],
      "type": "ReactNode",
      "simplifiedType": "ReactNode",
      "required": true,
      "deprecated": false
    },
    {
      "name": "url",
      "description": "",
      "tags": [],
      "type": "string | undefined",
      "simplifiedType": "string",
      "required": false,
      "deprecated": false
    }
  ]
}}
/>
