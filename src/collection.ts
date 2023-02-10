import { CollectionEntry, getCollection, z } from 'astro:content';
import partition from 'lodash-es/partition';

export const draftSchema = z.object({
  draft: z.boolean().default(false),
});

export const recipeSchema = draftSchema.merge(
  z.object({
    title: z.string(),
    authors: z.array(z.string()).default(['Stef Korporaal']),
    date: z.date().optional(),
    updated: z.date().optional(),
  })
);

export const portfolioSchema = draftSchema.merge(
  z.object({
    weight: z.number().default(0),
  })
);

export const timelineSchema = draftSchema.merge(
  z.object({
    dateStart: z.number().optional(),
    dateEnd: z.number().optional(),
    logo: z
      .string()
      .transform((logo) => 'timeline/' + logo)
      .optional(),
    name: z.string(),
    dark: z.boolean().default(false),
    png: z.boolean().default(false),
  })
);

export const skillSchema = draftSchema.merge(
  z.object({
    logo: z.string().transform((logo) => 'skills/' + logo),
    name: z.string(),
    category: z.enum(['lang', 'tech', 'other']),
    padding: z.enum(['p-0', 'p-1', 'p-2', 'p-3', 'p-4']).default('p-2'),
    dark: z.boolean().default(false),
    png: z.boolean().default(false),
    weight: z.number().default(0),
  })
);

export type Recipe = z.infer<typeof recipeSchema>;

function defaultFilter(entry: { data: { draft: boolean } }): boolean {
  return !entry.data.draft;
}

export function getRecipes(): Promise<CollectionEntry<'recipe'>[]> {
  return getCollection('recipe', defaultFilter);
}

export async function getPortfolioEntries(): Promise<
  CollectionEntry<'portfolio'>[]
> {
  const entries = await getCollection('portfolio', defaultFilter);

  return entries.sort((left, right) => left.data.weight - right.data.weight);
}

export async function getTimelineEntries(): Promise<
  CollectionEntry<'timeline'>[]
> {
  const entries = await getCollection('timeline', defaultFilter);

  return entries.sort(
    (left, right) => (left.data.dateStart ?? 0) - (right.data.dateStart ?? 0)
  );
}

export async function getSkillEntries(): Promise<{
  langEntries: CollectionEntry<'skill'>[];
  techEntries: CollectionEntry<'skill'>[];
  otherEntries: CollectionEntry<'skill'>[];
}> {
  let entries = await getCollection('skill', defaultFilter);

  entries = entries.sort((left, right) => left.data.weight - right.data.weight);

  const [langEntries, rest] = partition(
    entries,
    (entry) => entry.data.category === 'lang'
  );

  const [techEntries, otherEntries] = partition(
    rest,
    (entry) => entry.data.category === 'tech'
  );

  return {
    langEntries,
    techEntries,
    otherEntries,
  };
}
