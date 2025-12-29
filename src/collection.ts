import { type CollectionEntry, getCollection, z } from "astro:content";
import { normalizeTag } from "./tag";

export const draftSchema = z.object({
    draft: z.boolean().default(false),
});

export const recipeSchema = draftSchema.merge(
    z.object({
        title: z.string(),
        authors: z.array(z.string()).default(["Stef Korporaal"]),
        date: z.date().optional(),
        updated: z.date().optional(),
        tags: z.array(z.string()).default(["Untagged"]),
    })
);

export const portfolioSchema = draftSchema.merge(
    z.object({
        name: z.string(),
        source: z.string(),
        weight: z.number().default(0),
    })
);

export const timelineSchema = draftSchema.merge(
    z.object({
        dateStart: z.number().optional(),
        dateEnd: z.number().optional(),
        logo: z
            .string()
            .transform((logo) => "timeline/" + logo)
            .optional(),
        name: z.string(),
        dark: z.boolean().default(false),
        png: z.boolean().default(false),
    })
);

export const skillSchema = draftSchema.merge(
    z.object({
        name: z.string(),
        icon: z.string(),
        category: z.enum(["lang", "tech", "other"]),
        weight: z.number().default(0),
        tagline: z.string(),
    })
);

export type Recipe = z.infer<typeof recipeSchema>;

function defaultFilter(entry: { data: { draft: boolean } }): boolean {
    return !entry.data.draft;
}

export async function getRecipes(): Promise<CollectionEntry<"recipe">[]> {
    const entries = await getCollection("recipe", defaultFilter);

    return entries.sort(sortRecipes);
}

export async function getRecipesByTag(
    tag: string
): Promise<CollectionEntry<"recipe">[]> {
    const entries = await getCollection("recipe", defaultFilter);

    return entries
        .filter((recipe) => recipe.data.tags.includes(tag))
        .sort(sortRecipes);
}

function sortRecipes(
    left: CollectionEntry<"recipe">,
    right: CollectionEntry<"recipe">
) {
    const leftTitle = unquote(left.data.title);
    const rightTitle = unquote(right.data.title);
    return leftTitle.localeCompare(rightTitle);
}

export async function getRecipeTags(): Promise<string[]> {
    const entries = await getRecipes();

    const allTags = entries.flatMap((entry) => entry.data.tags);

    const uniqueTags = [...new Set(allTags)].sort(sortTags);

    return uniqueTags;
}

function sortTags(left: string, right: string) {
    const leftTag = normalizeTag(left);
    const rightTag = normalizeTag(right);
    return leftTag.localeCompare(rightTag);
}

export async function getPortfolioEntries(): Promise<
    CollectionEntry<"portfolio">[]
> {
    const entries = await getCollection("portfolio", defaultFilter);

    return entries.sort((left, right) => left.data.weight - right.data.weight);
}

export async function getTimelineEntries(): Promise<
    CollectionEntry<"timeline">[]
> {
    const entries = await getCollection("timeline", defaultFilter);

    return entries.sort(
        (left, right) =>
            (left.data.dateStart ?? 0) - (right.data.dateStart ?? 0)
    );
}

export async function getSkillEntries(): Promise<CollectionEntry<"skills">[]> {
    let entries = await getCollection("skills", defaultFilter);

    entries = entries.sort(
        (left, right) => left.data.weight - right.data.weight
    );

    return entries;
}

function unquote(string: string) {
    return string.replace(/^['"]/g, "").replace(/['"]$/g, "");
}
