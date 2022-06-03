import { type FilterState } from './filter.model';
import Post from '../post';

interface JsonPost {
  title: string;
  type: string;
  lang: string;
  url: string;
  date?: string;
}

export default class PostModel {
  private posts: Post[] = [];

  private loaded = false;

  constructor(private url: string) {}

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
    let sort: number;

    if (!left.date && !right.date) {
      sort = PostModel.sortByAlphaAscending(left, right);
    } else if (!left.date) {
      sort = -1;
    } else if (!right.date) {
      sort = 1;
    } else {
      sort = left.date.getTime() - right.date.getTime();
    }

    return sort;
  }

  private static sortByDateDescending(left: Post, right: Post): number {
    let sort: number;

    if (!left.date && !right.date) {
      sort = PostModel.sortByAlphaAscending(left, right);
    } else if (!left.date) {
      sort = 1;
    } else if (!right.date) {
      sort = -1;
    } else {
      sort = right.date.getTime() - left.date.getTime();
    }

    return sort;
  }

  private static filterPostModelByTitle(
    post: Post,
    titleFilter: string
  ): boolean {
    return post.title.toLowerCase().includes(titleFilter.toLowerCase());
  }

  private static filterPostModelByType(
    post: Post,
    activeTypes: string[]
  ): boolean {
    return activeTypes.includes(post.type);
  }

  private static sortPostModels(
    posts: Post[],
    sortType: 'alpha' | 'date',
    sortDir: 'ascending' | 'descending'
  ): Post[] {
    let sortedPosts: Post[];

    if (sortType === 'alpha') {
      if (sortDir === 'ascending') {
        sortedPosts = posts.sort((left, right) =>
          PostModel.sortByAlphaAscending(left, right)
        );
      } else {
        sortedPosts = posts.sort((left, right) =>
          PostModel.sortByAlphaDescending(left, right)
        );
      }
    } else if (sortDir === 'ascending') {
      sortedPosts = posts.sort((left, right) =>
        PostModel.sortByDateAscending(left, right)
      );
    } else {
      sortedPosts = posts.sort((left, right) =>
        PostModel.sortByDateDescending(left, right)
      );
    }

    return sortedPosts;
  }

  getPosts(state: FilterState): Post[] {
    if (!this.loaded) {
      throw new Error('PostModel was not loaded.');
    }

    let posts = this.posts.slice();

    const activeTypes = state.getActiveTypes();

    if (activeTypes.length) {
      posts = posts.filter((post) =>
        PostModel.filterPostModelByType(post, activeTypes)
      );
    }

    posts = PostModel.sortPostModels(posts, state.sortType, state.sortDir);

    return posts;
  }

  async load(): Promise<void> {
    const response = await fetch(this.url);
    const json = (await response.json()) as { posts: JsonPost[] };
    this.posts = json.posts.map((post) => PostModel.jsonToPost(post));
    this.loaded = true;
  }
}
