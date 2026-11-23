import { defineConfig, envField } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import satteriExternalLinks from "satteri-external-links";
import { satteriKatex } from "satteri-katex";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import { loadEnv } from "vite";

// Astro config runs before .env files and astro:env are available.
const { SITE_URL } = loadEnv(
    process.env.NODE_ENV ?? "production",
    process.cwd(),
    "SITE_"
);
const siteDomain = SITE_URL || "stefkorporaal.is";
const siteUrl = new URL(
    siteDomain.includes("://") ? siteDomain : `https://${siteDomain}`
);

// https://astro.build/config
export default defineConfig({
    site: siteUrl.href,

    env: {
        schema: {
            SITE_URL: envField.string({
                context: "server",
                access: "public",
                default: siteUrl.hostname,
                min: 1,
            }),
            SITE_EMAIL_NAME: envField.string({
                context: "server",
                access: "public",
                default: "admin",
                min: 1,
            }),
        },
    },

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
        css: {
            postcss: {
                plugins: [
                    {
                        postcssPlugin: "woff2-only",
                        Declaration: {
                            src(declaration) {
                                // Remove legacy font fallbacks before Vite emits assets.
                                const woff2 = declaration.value
                                    .split(",")
                                    .filter((source) =>
                                        /format\(["']?woff2["']?\)/.test(source)
                                    );

                                if (woff2.length > 0) {
                                    declaration.value = woff2.join(",");
                                }
                            },
                        },
                    },
                ],
            },
        },
    },
});
