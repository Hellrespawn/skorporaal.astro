import { Observer } from '../observable';
import { Feed } from './feed';
import { Filter, FilterOptions } from './filter';
import { Post } from './post';

export class PostList implements Observer<FilterOptions> {
  constructor(
    private element: HTMLElement,
    private feed: Feed,
    private filter: Filter
  ) {}

  update(value: FilterOptions): void {
    console.log(`Filter changed: '${value}'`);

    const posts = this.feed.getPosts(value);

    this.render(posts);
  }

  async load(): Promise<PostList> {
    await this.feed.load();
    this.filter.subscribe(this);
    return this;
  }

  private render(posts: Post[]): void {
    const elements = posts.map((post) => post.renderPost());

    this.element.replaceChildren(...elements);
  }
}
