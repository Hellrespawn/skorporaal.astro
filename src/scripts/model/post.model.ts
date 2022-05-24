import { FilterOptions } from './filter.model';
import { Post } from '../post';

interface JsonPost {
  title: string;
  type: string;
  lang: string;
  url: string;
  date?: string;
}

export class PostModel {
  private posts: Post[] = [];
  private loaded = false;

  constructor(private url: string) {}

  getPosts(options?: FilterOptions): Post[] {
    if (!this.loaded) {
      throw new Error('PostModel was not loaded.');
    }

    let posts = this.posts;

    if (!options) {
      return posts;
    }

    if (options.filterTitle) {
      posts = posts.filter((post) =>
        PostModel.filterPostModelByTitle(post, options.filterTitle!)
      );
    }

    if (options.filterType) {
      posts = posts.filter((post) =>
        PostModel.filterPostModelByType(post, options.filterType!)
      );
    }

    if (options.sortType) {
      posts = PostModel.sortPostModels(
        posts,
        options.sortType,
        options.sortDir ?? 'descending'
      );
    }

    return posts;
  }

  async load(): Promise<void> {
    const response = await fetch(this.url);
    const json = await response.json();
    this.posts = json.posts.map(PostModel.jsonToPost);
    this.loaded = true;
  }

  private static jsonToPost(jsonPost: JsonPost): Post {
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
    return -PostModel.sortByAlphaAscending(left, right);
  }

  private static sortByDateAscending(left: Post, right: Post): number {
    if (!left.date && !right.date) {
      return PostModel.sortByAlphaAscending(left, right);
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
      return PostModel.sortByAlphaAscending(left, right);
    } else if (!left.date) {
      return 1;
    } else if (!right.date) {
      return -1;
    } else {
      return right.date.getTime() - left.date.getTime();
    }
  }

  private static filterPostModelByTitle(
    post: Post,
    titleFilter: string
  ): boolean {
    return post.title.toLowerCase().includes(titleFilter.toLowerCase());
  }

  private static filterPostModelByType(
    post: Post,
    typeFilter: string
  ): boolean {
    return post.type === typeFilter;
  }

  private static sortPostModels(
    posts: Post[],
    sortType: 'alpha' | 'date',
    sortDir: 'ascending' | 'descending'
  ): Post[] {
    if (sortType === 'alpha') {
      if (sortDir === 'ascending') {
        posts = posts.sort(PostModel.sortByAlphaAscending);
      } else {
        posts = posts.sort(PostModel.sortByAlphaDescending);
      }
    } else {
      if (sortDir === 'ascending') {
        posts = posts.sort(PostModel.sortByDateAscending);
      } else {
        posts = posts.sort(PostModel.sortByDateDescending);
      }
    }

    return posts;
  }
}
