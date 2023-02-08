import { CollectionEntry, getCollection, z } from 'astro:content';

export const postSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()).default(['Stef Korporaal']),
  date: z.date().optional(),
  updated: z.date().optional(),
});

export type Post = z.infer<typeof postSchema>;

export function getEntries(): Promise<CollectionEntry<'post'>[]> {
  return getCollection('post');
}
