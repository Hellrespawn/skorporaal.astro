import { CollectionEntry, getCollection, z } from 'astro:content';
import { PostCategory, POST_CATEGORIES } from './scripts/data';

export const postSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()).default(['Stef Korporaal']),
  date: z.union([z.date(), z.string()]).default('A long time ago...'),
  updated: z.date().optional(),
  lang: z.enum(['en', 'nl']).default('en'),
});

export type Post = z.infer<typeof postSchema>;

export interface EntryWithCategory {
  entry: CollectionEntry<'post'>;
  category: PostCategory;
}

export async function getEntriesWithCategory() {
  const entries: EntryWithCategory[] = [];

  for (const category of POST_CATEGORIES) {
    const categoryEntries = await getCollection(
      'post',
      ({ id }: { id: string }) => id.startsWith(category)
    );

    entries.push(
      ...categoryEntries.map((entry) => {
        return {
          entry,
          category,
        };
      })
    );
  }

  return entries;
}

export async function getStaticPaths() {
  const entriesWithCategory = await getEntriesWithCategory();

  const paths = entriesWithCategory.map((entryWithCategory) => ({
    params: {
      slug: entryWithCategory.entry.slug,
      category: entryWithCategory.category,
    },
    props: { entry: entryWithCategory.entry },
  }));

  return paths;
}
