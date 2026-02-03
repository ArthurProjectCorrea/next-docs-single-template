// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"en/latest/index.mdx": () => import("../content/docs/en/latest/index.mdx?collection=docs"), "en/v1/index.mdx": () => import("../content/docs/en/v1/index.mdx?collection=docs"), "pt/latest/index.mdx": () => import("../content/docs/pt/latest/index.mdx?collection=docs"), "pt/v1/index.mdx": () => import("../content/docs/pt/v1/index.mdx?collection=docs"), "en/latest/components/index.mdx": () => import("../content/docs/en/latest/components/index.mdx?collection=docs"), "en/latest/components/search.mdx": () => import("../content/docs/en/latest/components/search.mdx?collection=docs"), "en/latest/components/sidebar.mdx": () => import("../content/docs/en/latest/components/sidebar.mdx?collection=docs"), "en/latest/components/toc.mdx": () => import("../content/docs/en/latest/components/toc.mdx?collection=docs"), "en/latest/guides/creating-components.mdx": () => import("../content/docs/en/latest/guides/creating-components.mdx?collection=docs"), "en/latest/guides/index.mdx": () => import("../content/docs/en/latest/guides/index.mdx?collection=docs"), "pt/latest/components/index.mdx": () => import("../content/docs/pt/latest/components/index.mdx?collection=docs"), "pt/latest/components/search.mdx": () => import("../content/docs/pt/latest/components/search.mdx?collection=docs"), "pt/latest/components/sidebar.mdx": () => import("../content/docs/pt/latest/components/sidebar.mdx?collection=docs"), "pt/latest/components/toc.mdx": () => import("../content/docs/pt/latest/components/toc.mdx?collection=docs"), "pt/latest/guides/creating-components.mdx": () => import("../content/docs/pt/latest/guides/creating-components.mdx?collection=docs"), "pt/latest/guides/index.mdx": () => import("../content/docs/pt/latest/guides/index.mdx?collection=docs"), }),
};
export default browserCollections;