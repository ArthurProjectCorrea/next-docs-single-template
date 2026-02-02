# Fumadocs Core (the core library of Fumadocs): Get TOC

URL: /docs/headless/utils/get-toc
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/headless/utils/get-toc.mdx

Parse Table of contents from markdown/mdx content

<FeedbackBlock id="10831a23902db9b8" body="Parse Table of contents from markdown/mdx content.">
  Parse Table of contents from markdown/mdx content.
</FeedbackBlock>

> <FeedbackBlock id="3d1ede228d3d2afe" body="You can use the remark plugin directly">
>   [You can use the remark plugin directly](/docs/headless/mdx/headings)
> </FeedbackBlock>

Usage [#usage]

<FeedbackBlock id="a0533d2e4af32b8c" body="Note: If you're using a CMS, you should use the API provided by the CMS instead.">
  Note: If you're using a CMS, you should use the API provided by the CMS instead.
</FeedbackBlock>

```ts
import { getTableOfContents } from 'fumadocs-core/content/toc';

const toc = getTableOfContents('## markdown content');
```

Output [#output]

<FeedbackBlock id="1dd017c001071192" body="An array of TOCItemType is returned.">
  An array of [`TOCItemType`](/docs/headless/mdx/headings#output) is returned.
</FeedbackBlock>
