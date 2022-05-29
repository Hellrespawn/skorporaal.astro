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

    if (state.sortType) {
      posts = PostModel.sortPostModels(posts, state.sortType, state.sortDir);
    }

    return posts;
  }

  async load(): Promise<void> {
    const response = await fetch(this.url);
    const json = (await response.json()) as { posts: JsonPost[] };
    this.posts = json.posts.map(PostModel.jsonToPost);
    this.loaded = true;
  }

  private static jsonToPost(this: void, jsonPost: JsonPost): Post {
    return new Post(
      jsonPost.title,
      jsonPost.type,
      jsonPost.lang,
      jsonPost.url,
      jsonPost.date
    );
  }

  private static sortByAlphaAscending(
    this: void,
    left: Post,
    right: Post
  ): number {
    return left.title.localeCompare(right.title);
  }

  private static sortByAlphaDescending(
    this: void,
    left: Post,
    right: Post
  ): number {
    return -PostModel.sortByAlphaAscending(left, right);
  }

  private static sortByDateAscending(
    this: void,
    left: Post,
    right: Post
  ): number {
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

  private static sortByDateDescending(
    this: void,
    left: Post,
    right: Post
  ): number {
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
        sortedPosts = posts.sort(PostModel.sortByAlphaAscending);
      } else {
        sortedPosts = posts.sort(PostModel.sortByAlphaDescending);
      }
    } else if (sortDir === 'ascending') {
      sortedPosts = posts.sort(PostModel.sortByDateAscending);
    } else {
      sortedPosts = posts.sort(PostModel.sortByDateDescending);
    }

    return sortedPosts;
  }
}
