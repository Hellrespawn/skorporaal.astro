import { Feed } from './feed';
import { Filter, FilterOptions } from './filter';
import { Post } from './post';

export class PostList {
  constructor(
    private element: HTMLElement,
    private feed: Feed,
    private filter: Filter
  ) {}

  public async load(): Promise<PostList> {
    await this.feed.load();
    this.filter.getOptions().subscribe(this.onFilterChanged.bind(this));
    return this;
  }

  private render(posts: Post[]): void {
    const elements = posts.map((post) => post.renderPost());

    this.element.replaceChildren(...elements);
  }

  private onFilterChanged(options: FilterOptions): void {
    console.log(`Filter changed: '${options}'`);

    const posts = this.feed.getPosts(options);

    this.render(posts);
  }
}
