import { MarkdownInstance } from "astro";
import { AstroComponentFactory } from "astro/dist/types/runtime/server";

import slugify from "slugify";

import {
  type PostCategory,
  POST_CATEGORIES,
  SITE_DATA,
  CATEGORY_DATA,
  LANGUAGE_DATA,
} from "./data";
import { type DateFormat, DateFormatter } from "./date";

/**
 * Type guard that checks whether or not a string is a PostCategory
 * @param str
 * @returns
 */
export function isPostCategory(str: string): str is PostCategory {
  return POST_CATEGORIES.includes(str as PostCategory);
}

/**
 * Frontmatter
 */
export interface Frontmatter {
  title: string;
  authors?: string[];
  category?: string;
  date?: string;
  lang?: string;
  updated?: string;
}

/**
 * Base Markdown wrapper class
 */
export abstract class Post {
  constructor(protected instance: MarkdownInstance<Frontmatter>) {}

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

  get sortDate(): Date | undefined {
    return this.updated ?? this.date;
  }

  get lang(): string {
    return this.frontmatter.lang ?? this.category === "recipe" ? "nl" : "en";
  }

  get title(): string {
    return this.frontmatter.title;
  }

  get slug(): string {
    return slugify(this.title, { lower: true, strict: true });
  }

  get url(): string {
    return `/${this.category}/${this.slug}`;
  }

  get date(): Date | undefined {
    if (this.frontmatter.date) {
      return new Date(this.frontmatter.date);
    }
  }

  get updated(): Date | undefined {
    if (this.frontmatter.updated) {
      return new Date(this.frontmatter.updated);
    }
  }

  protected get frontmatter(): Frontmatter {
    return this.instance.frontmatter;
  }

  getFormattedDate(format: DateFormat): string {
    return DateFormatter.getFormatter(format).formatDate(this);
  }
}

export class FeedItem extends Post {
  get dot(): string {
    return CATEGORY_DATA[this.category].bg;
  }

  getFormattedTitle(): string {
    let { title } = this;
    const { lang } = this;

    if (lang !== SITE_DATA.lang) {
      title += ` [${LANGUAGE_DATA[SITE_DATA.lang][lang]}]`;
    }

    return title;
  }
}

export class FullPost extends Post {
  get authors(): string {
    const authors = this.frontmatter.authors ?? [];

    if (!authors.includes(SITE_DATA.name)) {
      authors.unshift(SITE_DATA.name);
    }

    return authors.join(", ");
  }

  get component(): AstroComponentFactory {
    return this.instance.Content;
  }

  get file(): string {
    return this.instance.file;
  }
}

export function getUrl(instance: MarkdownInstance<Frontmatter>): string {
  return new FullPost(instance).url;
}
