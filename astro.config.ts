import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from "@astrojs/mdx";

import remarkMath from 'remark-math';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://skorporaal.com',
  markdown: {
    // syntaxHighlight: "prism",
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeExternalLinks, {
      rel: ['nofollow', 'noopener', 'noreferrer'],
      target: '_blank'
    }], rehypeKatex],
    extendDefaultPlugins: true,
    shikiConfig: {
      wrap: true
    }
  },
  integrations: [vue(), mdx()],
});
