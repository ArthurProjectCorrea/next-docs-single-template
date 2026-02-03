// @ts-nocheck
import * as __fd_glob_15 from "../content/docs/pt/latest/guides/index.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/pt/latest/guides/creating-components.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/pt/latest/components/toc.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/pt/latest/components/sidebar.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/pt/latest/components/search.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/pt/latest/components/index.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/en/latest/guides/index.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/en/latest/guides/creating-components.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/en/latest/components/toc.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/en/latest/components/sidebar.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/en/latest/components/search.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/en/latest/components/index.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/pt/v1/index.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/pt/latest/index.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/en/v1/index.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/en/latest/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"en/latest/index.mdx": __fd_glob_0, "en/v1/index.mdx": __fd_glob_1, "pt/latest/index.mdx": __fd_glob_2, "pt/v1/index.mdx": __fd_glob_3, "en/latest/components/index.mdx": __fd_glob_4, "en/latest/components/search.mdx": __fd_glob_5, "en/latest/components/sidebar.mdx": __fd_glob_6, "en/latest/components/toc.mdx": __fd_glob_7, "en/latest/guides/creating-components.mdx": __fd_glob_8, "en/latest/guides/index.mdx": __fd_glob_9, "pt/latest/components/index.mdx": __fd_glob_10, "pt/latest/components/search.mdx": __fd_glob_11, "pt/latest/components/sidebar.mdx": __fd_glob_12, "pt/latest/components/toc.mdx": __fd_glob_13, "pt/latest/guides/creating-components.mdx": __fd_glob_14, "pt/latest/guides/index.mdx": __fd_glob_15, });