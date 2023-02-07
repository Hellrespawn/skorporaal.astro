import { CollectionEntry, getCollection, z } from 'astro:content';
import {
  LANGUAGE_DATA,
  PostCategory,
  POST_CATEGORIES,
  SITE_DATA,
} from './data';

export const postSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()).default(['Stef Korporaal']),
  date: z.date().optional(),
  updated: z.date().optional(),
  lang: z.enum(['en', 'nl']).default('en'),
});

export type Post = z.infer<typeof postSchema>;

export async function getEntries(): Promise<CollectionEntry<'post'>[]> {
  const promises = POST_CATEGORIES.map((category) => {
    return getCollection('post', ({ id }: { id: string }) =>
      id.startsWith(category)
    );
  });

  const collections = await Promise.all(promises);

  return collections.flat();
}

export function formatTitleFromPost(post: Post): string {
  let { title } = post;
  const { lang } = post;

  if (lang !== SITE_DATA.lang) {
    title += ` [${LANGUAGE_DATA[SITE_DATA.lang]![lang]}]`;
  }

  return title;
}

export function getCategoryFromEntry(
  entry: CollectionEntry<'post'>
): PostCategory {
  return entry.slug.split('/')[0] as PostCategory;
}
