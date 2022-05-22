import { FilterOptions } from './filter';
import { Post } from './post';

interface JsonPost {
  title: string;
  type: string;
  lang: string;
  url: string;
  date?: string;
}

export class Feed {
  private posts: Post[] = [];

  constructor(private url: string) {}

  public async load(): Promise<Feed> {
    const response = await fetch(this.url);
    const json = await response.json();
    this.posts = json.posts.map(Feed.createPost);
    return this;
  }

  public getPosts(options?: FilterOptions): Post[] {
    let posts = this.posts;

    if (!options) {
      return posts;
    }

    if (options.filterTitle) {
      posts = posts.filter((post) =>
        Feed.filterPostByTitle(post, options.filterTitle!)
      );
    }

    if (options.filterType) {
      posts = posts.filter((post) =>
        Feed.filterPostByType(post, options.filterType!)
      );
    }

    if (options.sortType) {
      posts = Feed.sortPosts(
        posts,
        options.sortType,
        options.sortDir ?? 'descending'
      );
    }

    return posts;
  }

  private static createPost(jsonPost: JsonPost): Post {
    return new Post(
      jsonPost.title,
      jsonPost.type,
      jsonPost.lang,
      jsonPost.url,
      jsonPost.date
    );
  }

  private static sortByAlphaAscending(left: Post, right: Post): number {
    return left.title.localeCompare(right.title);
  }

  private static sortByAlphaDescending(left: Post, right: Post): number {
    return -Feed.sortByAlphaAscending(left, right);
  }

  private static sortByDateAscending(left: Post, right: Post): number {
    if (!left.date && !right.date) {
      return Feed.sortByAlphaAscending(left, right);
    } else if (!left.date) {
      return -1;
    } else if (!right.date) {
      return 1;
    } else {
      return left.date.getTime() - right.date.getTime();
    }
  }

  private static sortByDateDescending(left: Post, right: Post): number {
    if (!left.date && !right.date) {
      return Feed.sortByAlphaAscending(left, right);
    } else if (!left.date) {
      return 1;
    } else if (!right.date) {
      return -1;
    } else {
      return right.date.getTime() - left.date.getTime();
    }
  }

  private static filterPostByTitle(post: Post, titleFilter: string): boolean {
    return post.title.toLowerCase().includes(titleFilter.toLowerCase());
  }

  private static filterPostByType(post: Post, typeFilter: string): boolean {
    return post.type === typeFilter;
  }

  private static sortPosts(
    posts: Post[],
    sortType: 'alpha' | 'date',
    sortDir: 'ascending' | 'descending'
  ): Post[] {
    if (sortType === 'alpha') {
      if (sortDir === 'ascending') {
        posts = posts.sort(Feed.sortByAlphaAscending);
      } else {
        posts = posts.sort(Feed.sortByAlphaDescending);
      }
    } else {
      if (sortDir === 'ascending') {
        posts = posts.sort(Feed.sortByDateAscending);
      } else {
        posts = posts.sort(Feed.sortByDateDescending);
      }
    }

    return posts;
  }
}
