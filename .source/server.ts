// @ts-nocheck
import * as __fd_glob_7 from "../content/docs/latest/guides/index.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/latest/guides/creating-components.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/latest/components/toc.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/latest/components/sidebar.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/latest/components/search.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/latest/components/index.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/v1/index.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/latest/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"latest/index.mdx": __fd_glob_0, "v1/index.mdx": __fd_glob_1, "latest/components/index.mdx": __fd_glob_2, "latest/components/search.mdx": __fd_glob_3, "latest/components/sidebar.mdx": __fd_glob_4, "latest/components/toc.mdx": __fd_glob_5, "latest/guides/creating-components.mdx": __fd_glob_6, "latest/guides/index.mdx": __fd_glob_7, });