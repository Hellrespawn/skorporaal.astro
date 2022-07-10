import { type MarkdownInstance } from "astro";

import { CATEGORY_DATA } from "@s:data";
import { type Frontmatter, Post } from "@s:post";
import { type DateFormat } from "../date";

export class FeedItem extends Post {
  dot: string;

  constructor(
    instance: MarkdownInstance<Frontmatter>,
    format: DateFormat = "short"
  ) {
    super(instance, format);
    this.dot = CATEGORY_DATA[this.category].bg;
  }
}
