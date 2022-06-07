import { MarkdownInstance } from "astro";
import { AstroComponentFactory } from "astro/dist/types/runtime/server";
import { dateToString } from "./common";
import { SITE } from "./config";

export const POST_TYPES = <const>["article", "portfolio", "recipe"];

export type PostType = typeof POST_TYPES[number];

export interface CategoryData {
  bg: string;
  border: string;
  plural: string;
  single: string;
  text: string;
}

export const CATEGORY_DATA: { [key in PostType]: CategoryData } = <const>{
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
};

export interface Frontmatter {
  title: string;
  type: PostType;
  categories: string[];
  tags: string[];
  authors?: string[];
  description?: string;
  date?: string;
  updated?: string;
}

class MarkdownInstanceWrapper {
  constructor(protected instance: MarkdownInstance<Frontmatter>) {}

  protected get frontmatter(): Frontmatter {
    return this.instance.frontmatter;
  }

  get type(): PostType {
    if (this.frontmatter.type) {
      return this.frontmatter.type;
    }
    const file = this.instance.file;
    const segments = file.split("/");
    return segments[segments.length - 2] as PostType;
  }

  get formattedDate(): string {
    const date = this.frontmatter.updated || this.frontmatter.date;
    if (date) {
      return dateToString(new Date(date));
    } else {
      return "A long time ago...";
    }
  }
}

export class FeedItem extends MarkdownInstanceWrapper {
  get title(): string {
    return this.frontmatter.title;
  }

  get component(): AstroComponentFactory {
    return this.instance.Content;
  }
}

export class FullPost extends MarkdownInstanceWrapper {
  get title(): string {
    return this.frontmatter.title;
  }

  get authors(): string {
    const authors = [SITE.name];

    if (this.frontmatter.authors) {
      authors.push(...this.frontmatter.authors);
    }
    return authors.join(", ");
  }

  get component(): AstroComponentFactory {
    return this.instance.Content;
  }
}
