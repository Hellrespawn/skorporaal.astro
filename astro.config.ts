import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: "https://skorporaal.com/",

    markdown: {
        processor: unified({
            remarkPlugins: [remarkMath],
            rehypePlugins: [
                rehypeKatex,
                [
                    rehypeExternalLinks,
                    {
                        rel: ["nofollow", "noopener", "noreferrer"],
                        target: "_blank",
                    },
                ],
            ],
        }),
        shikiConfig: {
            wrap: true,
        },
    },

    integrations: [react({ compiler: true }), mdx()],

    vite: {
        plugins: [tailwindcss()],
    },
});
