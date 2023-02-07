import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  site: 'https://skorporaal.com/',
  markdown: {
    rehypePlugins: [
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
