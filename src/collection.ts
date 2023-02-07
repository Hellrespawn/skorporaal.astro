import { CollectionEntry, getCollection, z } from 'astro:content';
import { LANGUAGE_DATA, SITE_DATA } from './data';

export const postSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()).default(['Stef Korporaal']),
  date: z.date().optional(),
  updated: z.date().optional(),
  lang: z.enum(['en', 'nl']).default('en'),
});

export type Post = z.infer<typeof postSchema>;

export function getEntries(): Promise<CollectionEntry<'post'>[]> {
  return getCollection('post');
}

export function formatTitleFromPost(post: Post): string {
  let { title } = post;
  const { lang } = post;

  if (lang !== SITE_DATA.lang) {
    title += ` [${LANGUAGE_DATA[SITE_DATA.lang]![lang]}]`;
  }

  return title;
}
