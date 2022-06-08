/** Site Data */
const name = "Stef Korporaal";
const description = `Personal website of ${name}`;

export const SITE_DATA = {
  name,
  description,
  url: "skorporaal.com",
  email: "stef@skorporaal.com",
  github: "https://github.com/Hellrespawn",
  builtAt: new Date(),
};

/**
 * All valid post categories.
 * NOTE: Must be manually alphabetized.
 */
export const POST_CATEGORIES = ["article", "portfolio", "recipe", "other"];

export type PostCategory = typeof POST_CATEGORIES[number];

/**
 * Data associated with categories.
 */
export interface CategoryData {
  bg: string;
  border: string;
  plural: string;
  single: string;
  text: string;
}

export const CATEGORY_DATA: Record<PostCategory, CategoryData> = {
  article: {
    bg: "bg-secondary-500",
    border: "border-secondary-500",
    plural: "Articles",
    single: "Article",
    text: "text-secondary-500",
  },
  portfolio: {
    bg: "bg-primary-500",
    border: "border-primary-500",
    plural: "Portfolio",
    single: "Portfolio",
    text: "text-primary-500",
  },
  recipe: {
    bg: "bg-tertiary-500",
    border: "border-tertiary-500",
    plural: "Recipes",
    single: "Recipe",
    text: "text-tertiary-500",
  },
  other: {
    bg: "bg-rose-500",
    border: "border-rose-500",
    plural: "Other",
    single: "Other",
    text: "text-rose-500",
  },
};
