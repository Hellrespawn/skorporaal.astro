import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import react from "@astrojs/react";
import wyw from "@wyw-in-js/vite";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: "https://skorporaal.com/",

    markdown: {
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
        shikiConfig: {
            wrap: true,
        },
    },

    integrations: [react()],

    vite: {
        plugins: [
            tailwindcss(),
            wyw({
                include: ["**/*.{ts,tsx}"],
                babelOptions: {
                    presets: [
                        "@babel/preset-typescript",
                        "@babel/preset-react",
                    ],
                },
            }),
        ],
    },
});
