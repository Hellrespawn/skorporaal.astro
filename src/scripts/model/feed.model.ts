import { Observer, Subject } from '../observable';
import { FeedView } from '../view/feed.view';
import { FilterOptions } from './filter.model';
import { PostModel } from './post.model';

interface JsonPostModel {
  title: string;
  type: string;
  lang: string;
  url: string;
  date?: string;
}

export class FeedModel
  extends Subject<PostModel[]>
  implements Observer<FilterOptions>
{
  private posts: PostModel[] = [];

  constructor(private url: string, private view: FeedView) {
    // FIXME start with loaded posts?
    super([]);
  }
  update(value: FilterOptions): void {
    this.getPosts(value);
  }

  async load(): Promise<FeedModel> {
    const response = await fetch(this.url);
    const json = await response.json();
    this.posts = json.posts.map(FeedModel.createPostModel);
    this.subscribe(this.view);
    return this;
  }

  getPosts(options?: FilterOptions): void {
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

  private static createPostModel(jsonPostModel: JsonPostModel): PostModel {
    return new PostModel(
      jsonPostModel.title,
      jsonPostModel.type,
      jsonPostModel.lang,
      jsonPostModel.url,
      jsonPostModel.date
    );
  }

  private static sortByAlphaAscending(
    left: PostModel,
    right: PostModel
  ): number {
    return left.title.localeCompare(right.title);
  }

  private static sortByAlphaDescending(
    left: PostModel,
    right: PostModel
  ): number {
    return -FeedModel.sortByAlphaAscending(left, right);
  }

  private static sortByDateAscending(
    left: PostModel,
    right: PostModel
  ): number {
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

  private static sortByDateDescending(
    left: PostModel,
    right: PostModel
  ): number {
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
    post: PostModel,
    titleFilter: string
  ): boolean {
    return post.title.toLowerCase().includes(titleFilter.toLowerCase());
  }

  private static filterPostModelByType(
    post: PostModel,
    typeFilter: string
  ): boolean {
    return post.type === typeFilter;
  }

  private static sortPostModels(
    posts: PostModel[],
    sortType: 'alpha' | 'date',
    sortDir: 'ascending' | 'descending'
  ): PostModel[] {
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
