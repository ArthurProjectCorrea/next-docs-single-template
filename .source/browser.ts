// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<
  typeof Config,
  import('fumadocs-mdx/runtime/types').InternalTypeConfig & {
    DocData: {};
  }
>();
const browserCollections = {
  docs: create.doc('docs', {
    '02.introduction.mdx': () =>
      import('../content/docs/02.introduction.mdx?collection=docs'),
    'index.mdx': () => import('../content/docs/index.mdx?collection=docs'),
    '01.API/01.introduction.mdx': () =>
      import('../content/docs/01.API/01.introduction.mdx?collection=docs'),
    '01.API/02.introduction.mdx': () =>
      import('../content/docs/01.API/02.introduction.mdx?collection=docs'),
    '01.API/index.mdx': () =>
      import('../content/docs/01.API/index.mdx?collection=docs'),
    '03.Intro/01.introduction.mdx': () =>
      import('../content/docs/03.Intro/01.introduction.mdx?collection=docs'),
    '03.Intro/02.introduction.mdx': () =>
      import('../content/docs/03.Intro/02.introduction.mdx?collection=docs'),
    '03.Intro/index.mdx': () =>
      import('../content/docs/03.Intro/index.mdx?collection=docs'),
  }),
};
export default browserCollections;
