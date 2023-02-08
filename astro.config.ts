import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

import rehypeExternalLinks from 'rehype-external-links';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://skorporaal.com/',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeExternalLinks,
        {
          rel: ['nofollow', 'noopener', 'noreferrer'],
          target: '_blank',
        },
      ],
    ],
    shikiConfig: {
      wrap: true,
    },
  },
  integrations: [vue()],
});
