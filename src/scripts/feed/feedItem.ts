import { type MarkdownInstance } from "astro";
import { CATEGORY_DATA } from "@scripts/data";
import { type Frontmatter, Post } from "@scripts/post";

export class FeedItem extends Post {
  dot: string;
  url: string;

  constructor(instance: MarkdownInstance<Frontmatter>) {
    super(instance);
    this.dot = CATEGORY_DATA[this.category].bg;
    this.url = `/${this.category}/${this.slug}`;
  }
}
