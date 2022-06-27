import { MarkdownInstance } from "astro";
import { AstroComponentFactory } from "astro/dist/types/runtime/server";

import slugify from "slugify";

import { dateToString } from "./common";
import { type PostCategory, POST_CATEGORIES, SITE_DATA } from "./data";

/**
 * Type guard that checks whether or not a string is a PostCategory
 * @param str
 * @returns
 */
export function isPostCategory(str: string): str is PostCategory {
  return POST_CATEGORIES.includes(str);
}

/**
 * Frontmatter
 */
export interface Frontmatter {
  title: string;
  authors?: string[];
  category?: PostCategory;
  date?: string;
  lang?: string;
  updated?: string;
}

/**
 * Base Markdown wrapper class
 */
export abstract class Post {
  category: PostCategory;
  formattedDate: string;
  lang: string;
  slug: string;
  title: string;
  url: string;
  date?: Date;

  constructor(instance: MarkdownInstance<Frontmatter>) {
    this.category = this.getCategory(instance);
    this.date = this.getDate(instance);
    this.formattedDate = this.getFormattedDate();
    this.lang =
      instance.frontmatter.lang ?? this.category === "recipe" ? "nl" : "en";
    this.title = instance.frontmatter.title;
    this.slug = slugify(this.title, { lower: true, strict: true });
    this.url = `/${this.category}/${this.slug}`;
  }

  getCategory(instance: MarkdownInstance<Frontmatter>): PostCategory {
    let { category } = instance.frontmatter;

    if (!category) {
      const { file } = instance;
      const segments = file.split("/");
      category = segments[segments.length - 2];
    }

    if (category && isPostCategory(category)) {
      return category;
    }

    return "other";
  }

  getDate(instance: MarkdownInstance<Frontmatter>): Date | undefined {
    const date = instance.frontmatter.updated ?? instance.frontmatter.date;

    if (date) {
      return new Date(date);
    }
  }

  getFormattedDate(): string {
    if (this.date) {
      return dateToString(this.date);
    }
    return "A long time ago...";
  }
}

export class FullPost extends Post {
  authors: string[];
  component: AstroComponentFactory;
  file: string;

  constructor(instance: MarkdownInstance<Frontmatter>) {
    super(instance);
    this.authors = [SITE_DATA.name];
    this.authors.push(...(instance.frontmatter.authors ?? []));

    this.component = instance.Content;

    this.file = instance.file;
  }

  authorsToString(): string {
    return this.authors.join(", ");
  }
}

export function getUrl(instance: MarkdownInstance<Frontmatter>): string {
  return new FullPost(instance).url;
}
