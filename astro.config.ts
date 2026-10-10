import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import satteriExternalLinks from "satteri-external-links";
import { satteriKatex } from "satteri-katex";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: "https://skorporaal.com/",

    markdown: {
        processor: satteri({
            features: { math: true },
            mdastPlugins: [satteriKatex()],
            hastPlugins: [
                satteriExternalLinks({
                    rel: ["nofollow", "noopener", "noreferrer"],
                    target: "_blank",
                }),
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
