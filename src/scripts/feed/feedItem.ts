import { type MarkdownInstance } from "astro";
import { CATEGORY_DATA } from "@s:data";
import { type Frontmatter, Post } from "@s:post";

export class FeedItem extends Post {
  dot: string;

  constructor(instance: MarkdownInstance<Frontmatter>) {
    super(instance);
    this.dot = CATEGORY_DATA[this.category].bg;
  }
}
