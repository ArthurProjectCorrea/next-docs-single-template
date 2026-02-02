# Fumadocs (Framework Mode): Versioning

URL: /docs/versioning
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/(framework)/versioning.mdx

Implementing multi-version in your docs.

Overview [#overview]

<FeedbackBlock id="5f8cde3b14178fd7" body="It's common for developer tool related docs to version their docs, such as different docs for v1 and v2 of the same tool.">
  It's common for developer tool related docs to version their docs, such as different docs for v1 and v2 of the same tool.
</FeedbackBlock>

<FeedbackBlock id="90f8823b9b5ad60f" body="Fumadocs provide the primitives for you to implement versioning on your own way.">
  Fumadocs provide the primitives for you to implement versioning on your own way.
</FeedbackBlock>

Partial Versioning [#partial-versioning]

<FeedbackBlock id="fa0972e3886dfc82" body="When versioning only applies to part of your docs, You can separate them by folders.">
  When versioning only applies to part of your docs, You can separate them by folders.
</FeedbackBlock>

<FeedbackBlock id="506c2c0c7f5b70af" body="For example:">
  For example:
</FeedbackBlock>

<Files>
  <Folder name="java-sdk" defaultOpen>
    <Folder name="v1" defaultOpen>
      <File name="getting-started.mdx" />
    </Folder>

    <Folder name="v2" defaultOpen>
      <File name="getting-started.mdx" />
    </Folder>

  </Folder>
</Files>

<Callout title="Good to Know">
  When grouping with folders, you can display them as tabs [using Sidebar
  Tabs](/docs/ui/layouts/docs#sidebar-tabs).
</Callout>

Full Versioning [#full-versioning]

<FeedbackBlock id="bd9b0f94c530fd07" body="Sometimes you want to version the entire website, such as https://v14.fumadocs.dev (Fumadocs v14) and https://fumadocs.dev (Latest Fumadocs).">
  Sometimes you want to version the entire website, such as [https://v14.fumadocs.dev](https://v14.fumadocs.dev) (Fumadocs v14) and [https://fumadocs.dev](https://fumadocs.dev) (Latest Fumadocs).
</FeedbackBlock>

<FeedbackBlock id="2b04ca212b9ffc8c" body="You can create a Git branch for a version of docs (call it v2 for example), and deploy it as a separate app on another subdomain like v2.my-site.com.">
  You can create a Git branch for a version of docs (call it `v2` for example), and deploy it as a separate app on another subdomain like `v2.my-site.com`.
</FeedbackBlock>

<FeedbackBlock
id="9b6ab273994ec79f"
body="Optionally, you can link to the other versions from your docs.
This design allows some advantages over partial versioning:"

> Optionally, you can link to the other versions from your docs.
> This design allows some advantages over partial versioning:
> </FeedbackBlock>

<FeedbackBlock id="2b89652a6530acf0" body="Easy maintenance: Old docs/branches won't be affected when you iterate or upgrade dependencies.Better consistency: Not just the docs itself, your landing page (and other pages) will also be versioned.">
  * Easy maintenance: Old docs/branches won't be affected when you iterate or upgrade dependencies.
  * Better consistency: Not just the docs itself, your landing page (and other pages) will also be versioned.
</FeedbackBlock>
