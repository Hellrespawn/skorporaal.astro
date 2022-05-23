import { Observer, Subject } from '../observable';
import { FeedView } from '../view/feed.view';
import { FilterOptions } from './filter.model';
import { Post } from './post.model';

interface JsonPostModel {
  title: string;
  type: string;
  lang: string;
  url: string;
  date?: string;
}

export class FeedModel
  extends Subject<Post[]>
  implements Observer<FilterOptions>
{
  private posts: Post[] = [];
  private loaded = false;

  constructor(view: FeedView, private url: string) {
    super();
    this.subscribe(view);
  }

  update(value: FilterOptions): void {
    this.getPosts(value);
  }
  async getPosts(options?: FilterOptions): Promise<void> {
    if (!this.loaded) {
      await this.load();
    }

    let posts = this.posts;

    if (!options) {
      this.next(posts);
      return;
    }

    if (options.filterTitle) {
      posts = posts.filter((post) =>
        FeedModel.filterPostModelByTitle(post, options.filterTitle!)
      );
    }

    if (options.filterType) {
      posts = posts.filter((post) =>
        FeedModel.filterPostModelByType(post, options.filterType!)
      );
    }

    if (options.sortType) {
      posts = FeedModel.sortPostModels(
        posts,
        options.sortType,
        options.sortDir ?? 'descending'
      );
    }

    this.next(posts);
  }

  async load(): Promise<void> {
    const response = await fetch(this.url);
    const json = await response.json();
    this.posts = json.posts.map(FeedModel.createPostModel);
    this.loaded = true;
  }

  private static createPostModel(jsonPostModel: JsonPostModel): Post {
    return new Post(
      jsonPostModel.title,
      jsonPostModel.type,
      jsonPostModel.lang,
      jsonPostModel.url,
      jsonPostModel.date
    );
  }

  private static sortByAlphaAscending(left: Post, right: Post): number {
    return left.title.localeCompare(right.title);
  }

  private static sortByAlphaDescending(left: Post, right: Post): number {
    return -FeedModel.sortByAlphaAscending(left, right);
  }

  private static sortByDateAscending(left: Post, right: Post): number {
    if (!left.date && !right.date) {
      return FeedModel.sortByAlphaAscending(left, right);
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
      return FeedModel.sortByAlphaAscending(left, right);
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
        posts = posts.sort(FeedModel.sortByAlphaAscending);
      } else {
        posts = posts.sort(FeedModel.sortByAlphaDescending);
      }
    } else {
      if (sortDir === 'ascending') {
        posts = posts.sort(FeedModel.sortByDateAscending);
      } else {
        posts = posts.sort(FeedModel.sortByDateDescending);
      }
    }

    return posts;
  }
}
