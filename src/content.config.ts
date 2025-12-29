import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";

import {
    portfolioSchema,
    recipeSchema,
    timelineSchema,
    skillSchema,
} from "./collection";

export const collections = {
    recipe: defineCollection({
        loader: glob({
            pattern: "**/[^_]*.md(x)?",
            base: "./src/content/recipe",
        }),
        schema: recipeSchema,
    }),
    portfolio: defineCollection({
        loader: glob({
            pattern: "**/[^_]*.md",
            base: "./src/content/portfolio",
        }),
        schema: portfolioSchema,
    }),
    timeline: defineCollection({
        loader: glob({
            pattern: "**/[^_]*.md",
            base: "./src/content/timeline",
        }),
        schema: timelineSchema,
    }),
    skills: defineCollection({
        loader: file("./src/content/skills/skills.json"),
        schema: skillSchema,
    }),
};
