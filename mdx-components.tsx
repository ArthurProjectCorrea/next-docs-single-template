import type { MDXComponents } from 'mdx/types';
import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children))
    return children.map(getTextFromChildren).join('');
  if (React.isValidElement(children))
    return getTextFromChildren(
      (children.props as { children?: React.ReactNode }).children,
    );
  return '';
}

/**
 * Heading component with anchor link
 */
function Heading({
  level,
  children,
  className,
  ...props
}: {
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const Tag = `h${level}` as const;
  const id = slugify(getTextFromChildren(children));

  return (
    <Tag id={id} className={cn('group relative', className)} {...props}>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity"
        aria-label={`Link to ${getTextFromChildren(children)}`}
      >
        #
      </a>
    </Tag>
  );
}

const components: MDXComponents = {
  // Headings with anchor links
  h1: ({ children, ...props }) => (
    <Heading
      level={1}
      className="scroll-m-20 text-3xl font-bold tracking-tight text-foreground lg:text-4xl"
      {...props}
    >
      {children}
    </Heading>
  ),
  h2: ({ children, ...props }) => (
    <Heading
      level={2}
      className="scroll-m-20 mt-12 pb-2 text-2xl font-semibold tracking-tight text-foreground first:mt-0"
      {...props}
    >
      {children}
    </Heading>
  ),
  h3: ({ children, ...props }) => (
    <Heading
      level={3}
      className="scroll-m-20 mt-8 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </Heading>
  ),
  h4: ({ children, ...props }) => (
    <Heading
      level={4}
      className="scroll-m-20 mt-6 text-lg font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </Heading>
  ),

  // Paragraph
  p: ({ children, ...props }) => (
    <p
      className="mt-4 leading-7 text-foreground/90 [&:not(:first-child)]:mt-4"
      {...props}
    >
      {children}
    </p>
  ),

  // Lead
  Lead: ({ children, ...props }) => (
    <p className="text-xl text-muted-foreground" {...props}>
      {children}
    </p>
  ),

  // Large
  Large: ({ children, ...props }) => (
    <span className="text-lg font-semibold" {...props}>
      {children}
    </span>
  ),

  // Small
  Small: ({ children, ...props }) => (
    <small className="text-sm font-medium leading-none" {...props}>
      {children}
    </small>
  ),

  // Muted
  Muted: ({ children, ...props }) => (
    <p className="text-sm text-muted-foreground" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }) => (
    <ul
      className="mt-4 ml-6 list-disc space-y-2 text-foreground/90 marker:text-muted-foreground"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mt-4 ml-6 list-decimal space-y-2 text-foreground/90 marker:text-muted-foreground"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),

  // Blockquote
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-6 border-l-4 border-primary/30 bg-muted/30 py-2 pl-6 pr-4 italic text-muted-foreground [&>p]:mt-0"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children, ...props }) => (
    <code
      className="relative rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  ),

  // Links
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || '#'}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Table
  table: ({ children, ...props }) => (
    <div className="mt-6 w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="border-b border-border bg-muted/50" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-border" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="transition-colors hover:bg-muted/30" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left font-semibold text-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-foreground/90" {...props}>
      {children}
    </td>
  ),

  // Horizontal rule
  hr: (props) => <hr className="my-8 border-border" {...props} />,

  // Strong and emphasis
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),

  // Image - using standard img with alt for MDX content
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mt-6 rounded-lg border border-border"
      loading="lazy"
      alt={props.alt || ''}
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}

export default components;
