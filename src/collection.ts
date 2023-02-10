import { CollectionEntry, getCollection, z } from 'astro:content';
import partition from 'lodash-es/partition';

export const recipeSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()).default(['Stef Korporaal']),
  date: z.date().optional(),
  updated: z.date().optional(),
});

export const portfolioSchema = z.object({
  weight: z.number().default(0),
});

export const timelineSchema = z.object({
  dateStart: z.number(),
  dateEnd: z.number().optional(),
  logo: z
    .string()
    .transform((logo) => 'timeline/' + logo)
    .optional(),
  name: z.string().optional(),
  dark: z.boolean().default(false),
  png: z.boolean().default(false),
});

export const skillSchema = z.object({
  logo: z.string().transform((logo) => 'skills/' + logo),
  name: z.string(),
  category: z.enum(['lang', 'tech', 'other']),
  padding: z.enum(['p-0', 'p-1', 'p-2', 'p-4']).default('p-2'),
  dark: z.boolean().default(false),
  png: z.boolean().default(false),
  weight: z.number().default(0),
});

export type Recipe = z.infer<typeof recipeSchema>;

export function getRecipes(): Promise<CollectionEntry<'recipe'>[]> {
  return getCollection('recipe');
}

export async function getPortfolioEntries(): Promise<
  CollectionEntry<'portfolio'>[]
> {
  const entries = await getCollection('portfolio');

  return entries.sort((left, right) => left.data.weight - right.data.weight);
}

export async function getTimelineEntries(): Promise<
  CollectionEntry<'timeline'>[]
> {
  const entries = await getCollection('timeline');

  // TODO sort timeline entries

  return entries;
}

export async function getSkillEntries(): Promise<{
  langEntries: CollectionEntry<'skill'>[];
  techEntries: CollectionEntry<'skill'>[];
  otherEntries: CollectionEntry<'skill'>[];
}> {
  let entries = await getCollection('skill');

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
