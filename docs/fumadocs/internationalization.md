# Fumadocs Core (the core library of Fumadocs): Internationalization

URL: /docs/headless/internationalization
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/headless/internationalization.mdx

Support multiple languages in your documentation

Define Config [#define-config]

<FeedbackBlock id="b23a705e5642c999" body="Fumadocs core provides necessary middleware and options for i18n support.">
  Fumadocs core provides necessary middleware and options for i18n support.
</FeedbackBlock>

<FeedbackBlock id="112b861cb4095ad2" body="You can define a config to share between utilities.">
  You can define a config to share between utilities.
</FeedbackBlock>

```ts title="lib/i18n.ts"
import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'cn'],
});
```

Hide Locale Prefix [#hide-locale-prefix]

<FeedbackBlock id="43fc437a1b92d1e7" body="To hide the locale prefix (e.g. /en/page -> /page), use the hideLocale option.">
  To hide the locale prefix (e.g. `/en/page` -> `/page`), use the `hideLocale` option.
</FeedbackBlock>

```ts
import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'cn'],
  hideLocale: 'default-locale',
});
```

| Mode             | Description                                        |
| ---------------- | -------------------------------------------------- |
| `always`         | Always hide the prefix, detect locale from cookies |
| `default-locale` | Only hide the default locale                       |
| `never`          | Never hide the prefix (default)                    |

<Callout type="warn" title={<>Using <code>always</code></>}>
On `always` mode, locale is stored as a cookie (set by the middleware), which isn't optimal for static sites.

This may cause undesired cache problems, and need to pay extra attention on SEO to ensure search engines can index your pages correctly.
</Callout>

Fallback Language [#fallback-language]

<FeedbackBlock id="164acd2a9af2d04c" body="The fallback language to use when translations are missing for a page, default to your defaultLanguage.">
  The fallback language to use when translations are missing for a page, default to your `defaultLanguage`.
</FeedbackBlock>

<FeedbackBlock id="a5e899adbf324b77" body="Supported:">
  Supported:
</FeedbackBlock>

<FeedbackBlock id="90cb3b4eef95d641" body="A language in your languages array.When set to null, no fallback will be used.">
  * A language in your `languages` array.
  * When set to `null`, no fallback will be used.
</FeedbackBlock>

```ts
import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  languages: ['en', 'cn'],
  defaultLanguage: 'en',
  fallbackLanguage: 'cn',
});
```

Middleware [#middleware]

<FeedbackBlock id="28b2652c0cabebc7" body="Redirects users to appropriate locale, it can be customised from i18n.ts.">
  Redirects users to appropriate locale, it can be customised from `i18n.ts`.
</FeedbackBlock>

```ts title="proxy.ts"
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';

export default createI18nMiddleware(i18n);

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  // You may need to adjust it to ignore static assets in `/public` folder
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

> <FeedbackBlock id="77fc11ec14caaab1" body="When hideLocale is enabled, it uses NextResponse.rewrite to hide locale prefixes.">
>   When `hideLocale` is enabled, it uses `NextResponse.rewrite` to hide locale prefixes.
> </FeedbackBlock>
