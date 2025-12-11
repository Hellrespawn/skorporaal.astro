import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

const compilerConfig = {
  target: '19' // can be '17' | '18' | '19', default is 19
};

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

    integrations: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler", compilerConfig]],
            },
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
    },
});
