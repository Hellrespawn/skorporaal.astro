const name = 'Stef Korporaal';
const description = `Personal website of ${name}`;

/** Site Data */
export const SITE_DATA = {
  name,
  description,
  url: 'skorporaal.com',
  email: 'stef@skorporaal.com',
  github: 'https://github.com/Hellrespawn',
  lang: 'en',
  builtAt: new Date(),
};

/**
 * All valid post categories.
 */
export const POST_CATEGORIES = [
  'article',
  'portfolio',
  'recipe',
  'other',
] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

/**
 * Data associated with categories.
 */
export interface CategoryData {
  bg: string;
  border: string;
  plural: string;
  single: string;
  text: string;
  hidden?: boolean;
}

export const CATEGORY_DATA: Record<PostCategory, CategoryData> = {
  article: {
    bg: 'bg-secondary-500',
    border: 'border-secondary-500',
    plural: 'Articles',
    single: 'Article',
    text: 'text-secondary-500',
  },
  portfolio: {
    bg: 'bg-primary-500',
    border: 'border-primary-500',
    plural: 'Portfolio',
    single: 'Portfolio',
    text: 'text-primary-500',
  },
  recipe: {
    bg: 'bg-tertiary-500',
    border: 'border-tertiary-500',
    plural: 'Recipes',
    single: 'Recipe',
    text: 'text-tertiary-500',
    hidden: true,
  },
  other: {
    bg: 'bg-quaternary-500',
    border: 'border-quaternary-500',
    plural: 'Other',
    single: 'Other',
    text: 'text-quaternary-500',
  },
};

export const LANGUAGE_DATA: Record<string, Record<string, string>> = {
  en: {
    nl: 'Dutch',
    en: 'English',
  },
  nl: {
    nl: 'Nederlands',
    en: 'Engels',
  },
};