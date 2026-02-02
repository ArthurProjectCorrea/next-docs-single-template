// @ts-nocheck
import * as __fd_glob_7 from "../content/docs/Intro/kaintroduction.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/Intro/introduction.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/Intro/index.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/API/upintroduction.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/API/introduction.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/API/index.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/introduction.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"index.mdx": __fd_glob_0, "introduction.mdx": __fd_glob_1, "API/index.mdx": __fd_glob_2, "API/introduction.mdx": __fd_glob_3, "API/upintroduction.mdx": __fd_glob_4, "Intro/index.mdx": __fd_glob_5, "Intro/introduction.mdx": __fd_glob_6, "Intro/kaintroduction.mdx": __fd_glob_7, });