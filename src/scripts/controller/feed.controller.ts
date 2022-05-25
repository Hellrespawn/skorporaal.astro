import categoryData from '../../11ty/_data/categoryData.json';
import { FilterModel, FilterOptions } from '../model/filter.model';
import { PostModel } from '../model/post.model';
import { FeedView } from '../view/feed.view';
import { FilterButtonView } from '../view/filterButton.view';
import { SortButtonView } from '../view/sortButton.view';

export type Callback<T> = (value: T) => void;

export class FeedController {
  private postModel!: PostModel;
  private filterModel!: FilterModel;
  private feedView!: FeedView;
  private filterButtons!: FilterButtonView[];
  private sortButton!: SortButtonView;

  static init(feedUrl: string): void {
    new FeedController(feedUrl).render();
  }

  private constructor(feedUrl: string) {
    this.feedView = this.createFeedView();
    this.postModel = new PostModel(feedUrl);
    this.filterModel = new FilterModel();

    this.filterButtons = this.createFilterButtons();
    this.sortButton = this.createSortButton();
  }

  private render(): void {
    // Void operator handles floating promise.
    void this.postModel
      .load()
      .then(() => this.updateSort(FilterModel.defaultOptions));
    this.listen();
  }

  private createFeedView(): FeedView {
    const feedElement = document.getElementById('postFeed')!;
    return new FeedView(feedElement);
  }

  private createFilterButtons(): FilterButtonView[] {
    const buttons = Object.keys(categoryData).map((type) => {
      const element = document.getElementById(`${type}FilterButton`)!;
      return new FilterButtonView(element, this.updateFilter.bind(this), type);
    });

    return buttons;
  }

  private updateFilter(update: FilterOptions): void {
    const options = this.filterModel.updateOptions(update);
    this.clearFilterButtons(options.filterType);
    this.updateFeed(options);
  }

  private clearFilterButtons(currentType?: string): void {
    this.filterButtons.forEach((button) => {
      if (!currentType || button.type !== currentType) {
        button.clear();
      }
    });
  }

  private createSortButton(): SortButtonView {
    const element = document.getElementById('sortButton')!;
    const button = new SortButtonView(element, this.updateSort.bind(this));
    return button;
  }

  private updateSort(update: FilterOptions): void {
    const options = this.filterModel.updateOptions(update);
    this.updateFeed(options);
  }

  private updateFeed(options: FilterOptions): void {
    const posts = this.postModel.getPosts(options);
    this.feedView.render(posts);
  }

  private listen(): void {
    this.filterButtons.forEach((button) => button.listen());

    this.sortButton.listen();
  }
}
