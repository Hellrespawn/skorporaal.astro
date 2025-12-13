import {
    type CollectionEntry,
    getCollection,
    type SchemaContext,
    z,
} from "astro:content";

export const draftSchema = z.object({
    draft: z.boolean().default(false),
});

export const recipeSchema = draftSchema.merge(
    z.object({
        title: z.string(),
        authors: z.array(z.string()).default(["Stef Korporaal"]),
        date: z.date().optional(),
        updated: z.date().optional(),
    })
);

export const portfolioSchema = ({ image }: SchemaContext) =>
    z.object({
        draft: z.boolean().default(false),
        name: z.string(),
        source: z.string(),
        cover: image().optional(),
        weight: z.number().default(0),
    });

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

export function getRecipes(): Promise<CollectionEntry<"recipe">[]> {
    return getCollection("recipe", defaultFilter);
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
