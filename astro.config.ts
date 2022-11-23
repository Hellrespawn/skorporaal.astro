import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

import remarkMath from 'remark-math';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://skorporaal.com',
  markdown: {
    // syntaxHighlight: "prism",
    extendDefaultPlugins: true,
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ['nofollow', 'noopener', 'noreferrer'],
          target: '_blank',
        },
      ],
      rehypeKatex,
    ],
    shikiConfig: {
      wrap: true,
    },
  },
  integrations: [vue()],
});
