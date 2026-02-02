// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"latest/index.mdx": () => import("../content/docs/latest/index.mdx?collection=docs"), "v1/index.mdx": () => import("../content/docs/v1/index.mdx?collection=docs"), "latest/components/index.mdx": () => import("../content/docs/latest/components/index.mdx?collection=docs"), "latest/components/search.mdx": () => import("../content/docs/latest/components/search.mdx?collection=docs"), "latest/components/sidebar.mdx": () => import("../content/docs/latest/components/sidebar.mdx?collection=docs"), "latest/components/toc.mdx": () => import("../content/docs/latest/components/toc.mdx?collection=docs"), "latest/guides/creating-components.mdx": () => import("../content/docs/latest/guides/creating-components.mdx?collection=docs"), "latest/guides/index.mdx": () => import("../content/docs/latest/guides/index.mdx?collection=docs"), }),
};
export default browserCollections;