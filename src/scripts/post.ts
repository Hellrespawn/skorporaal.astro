import { MarkdownInstance } from "astro";
import { AstroComponentFactory } from "astro/dist/types/runtime/server";
import slugify from "slugify";
import { dateToString } from "./common";
import { SITE } from "./config";

/**
 * All valid post categories.
 * NOTE: Must be manually alphabetized.
 */
export const POST_CATEGORIES = ["article", "portfolio", "recipe", "other"];

export type PostCategory = typeof POST_CATEGORIES[number];

/**
 * Type guard that checks whether or not a string is a PostCategory
 * @param str
 * @returns
 */
function isPostCategory(str: string): str is PostCategory {
  return POST_CATEGORIES.includes(str);
}

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

export const CATEGORY_DATA: { [key in PostCategory]: CategoryData } = {
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

/**
 * Frontmatter
 */
export interface Frontmatter {
  title: string;
  category?: PostCategory;
  authors?: string[];
  date?: string;
  updated?: string;
}

/**
 * Base Markdown wrapper class
 */
abstract class MarkdownInstanceWrapper {
  constructor(protected instance: MarkdownInstance<Frontmatter>) {}

  get title(): string {
    return this.frontmatter.title;
  }

  get slug(): string {
    return slugify(this.title, { lower: true, strict: true });
  }

  get category(): PostCategory {
    let { category } = this.frontmatter;

    if (!category) {
      const { file } = this.instance;
      const segments = file.split("/");
      category = segments[segments.length - 2];
    }

    if (category && isPostCategory(category)) {
      return category;
    }
    return "other";
  }

  get formattedDate(): string {
    const date = this.frontmatter.updated ?? this.frontmatter.date;
    if (date) {
      return dateToString(new Date(date));
    }
    return "A long time ago...";
  }

  get component(): AstroComponentFactory {
    return this.instance.Content;
  }

  protected get frontmatter(): Frontmatter {
    return this.instance.frontmatter;
  }
}

export class FeedItem extends MarkdownInstanceWrapper {
  get url(): string {
    return `/${this.category}/${this.slug}`;
  }
}

export class FullPost extends MarkdownInstanceWrapper {
  get authors(): string {
    const authors = [SITE.name];

    if (this.frontmatter.authors) {
      authors.push(...this.frontmatter.authors);
    }
    return authors.join(", ");
  }
}
