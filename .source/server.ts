// @ts-nocheck
import * as __fd_glob_7 from '../content/docs/03.Intro/index.mdx?collection=docs';
import * as __fd_glob_6 from '../content/docs/03.Intro/02.introduction.mdx?collection=docs';
import * as __fd_glob_5 from '../content/docs/03.Intro/01.introduction.mdx?collection=docs';
import * as __fd_glob_4 from '../content/docs/01.API/index.mdx?collection=docs';
import * as __fd_glob_3 from '../content/docs/01.API/02.introduction.mdx?collection=docs';
import * as __fd_glob_2 from '../content/docs/01.API/01.introduction.mdx?collection=docs';
import * as __fd_glob_1 from '../content/docs/index.mdx?collection=docs';
import * as __fd_glob_0 from '../content/docs/02.introduction.mdx?collection=docs';
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<
  typeof Config,
  import('fumadocs-mdx/runtime/types').InternalTypeConfig & {
    DocData: {};
  }
>({ doc: { passthroughs: ['extractedReferences'] } });

export const docs = await create.docs(
  'docs',
  'content/docs',
  {},
  {
    '02.introduction.mdx': __fd_glob_0,
    'index.mdx': __fd_glob_1,
    '01.API/01.introduction.mdx': __fd_glob_2,
    '01.API/02.introduction.mdx': __fd_glob_3,
    '01.API/index.mdx': __fd_glob_4,
    '03.Intro/01.introduction.mdx': __fd_glob_5,
    '03.Intro/02.introduction.mdx': __fd_glob_6,
    '03.Intro/index.mdx': __fd_glob_7,
  },
);
