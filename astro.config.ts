import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://skorporaal.com",
  markdown: {
    remarkPlugins: ["remark-gfm", "remark-smartypants", "remark-math"],
    rehypePlugins: [["rehype-external-links", {
      rel: ["nofollow", "noopener", "noreferrer"],
      target: "_blank"
    }], "rehype-katex"]
  },
  integrations: [svelte()]
});
