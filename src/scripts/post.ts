import { MarkdownInstance } from "astro";
import { SITE } from "./config";

export type PostType = "article" | "portfolio" | "recipe";

export class Post {
  title: string;
  type: PostType = "article";
  authors: string[];
  categories: string[];
  tags: string[];
  description?: string;
  date?: string;
  updated?: string;

  static process(posts: MarkdownInstance<Post>[]): void {
    this.validate(posts);

    this.populateDefaults(posts);

    posts.sort(Post.dateDescendingSort);
  }

  private static validate(posts: MarkdownInstance<Post>[]): void {
    const errors = posts
      .filter((post) => !post.frontmatter.title)
      .map((post) => `Missing title: '${post.file}'`);

    if (errors.length) {
      throw errors.join("\n");
    }
  }

  private static populateDefaults(posts: MarkdownInstance<Post>[]): void {
    for (const post of posts) {
      post.frontmatter.authors = post.frontmatter.authors ?? [SITE.name];
      post.frontmatter.categories = post.frontmatter.categories ?? [];
      post.frontmatter.tags = post.frontmatter.tags ?? [];
    }
  }

  private static dateDescendingSort(
    a: MarkdownInstance<Post>,
    b: MarkdownInstance<Post>
  ): number {
    const aString = a.frontmatter.updated ?? a.frontmatter.date;
    const bString = b.frontmatter.updated ?? b.frontmatter.date;

    if (!aString || !bString) {
      return 0;
    } else {
      const [aTime, bTime] = [aString, bString].map((string) =>
        new Date(string).getTime()
      );
      return bTime - aTime;
    }
  }

  static getUniqueCategories(posts: MarkdownInstance<Post>[]): string[] {
    return [...new Set(posts.flatMap((post) => post.frontmatter.categories))];
  }

  static getUniqueTags(posts: MarkdownInstance<Post>[]): string[] {
    return [...new Set(posts.flatMap((post) => post.frontmatter.tags))];
  }
}
