import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://skorporaal.com',
  markdown: {
    remarkPlugins: ['remark-gfm', 'remark-smartypants'],
    rehypePlugins: [['rehype-external-links', { rel: ['nofollow', 'noopener', 'noreferrer'], target: '_blank' }]],
  },
});
