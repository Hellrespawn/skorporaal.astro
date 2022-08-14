import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://skorporaal.com',
  markdown: {
    // syntaxHighlight: "prism",
    remarkPlugins: ['remark-gfm', 'remark-smartypants', 'remark-math'],
    rehypePlugins: [['rehype-external-links', {
      rel: ['nofollow', 'noopener', 'noreferrer'],
      target: '_blank'
    }], 'rehype-katex'],
    shikiConfig: {
      wrap: true
    }
  },
  integrations: [vue(), mdx()],
});
