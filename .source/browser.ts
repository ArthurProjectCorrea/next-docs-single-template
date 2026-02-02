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
    'index.mdx': () => import('../content/docs/index.mdx?collection=docs'),
    'introduction.mdx': () =>
      import('../content/docs/introduction.mdx?collection=docs'),
    'API/index.mdx': () =>
      import('../content/docs/API/index.mdx?collection=docs'),
    'API/introduction.mdx': () =>
      import('../content/docs/API/introduction.mdx?collection=docs'),
    'API/upintroduction.mdx': () =>
      import('../content/docs/API/upintroduction.mdx?collection=docs'),
    'Intro/index.mdx': () =>
      import('../content/docs/Intro/index.mdx?collection=docs'),
    'Intro/introduction.mdx': () =>
      import('../content/docs/Intro/introduction.mdx?collection=docs'),
    'Intro/kaintroduction.mdx': () =>
      import('../content/docs/Intro/kaintroduction.mdx?collection=docs'),
  }),
};
export default browserCollections;
