import categoryData from '../../11ty/_data/categoryData.json';
import {
  FilterModel,
  type SortOptions,
  type FilterOptions,
} from '../model/filter.model';
import PostModel from '../model/post.model';
import FeedView from '../view/feed.view';
import FilterButtonView from '../view/filterButton.view';
import SortButtonView from '../view/sortButton.view';

export default class FeedController {
  private postModel!: PostModel;

  private filterModel!: FilterModel;

  private feedView!: FeedView;

  private filterButtons!: FilterButtonView[];

  private sortButton!: SortButtonView;

  static async init(feedUrl: string): Promise<void> {
    await new FeedController(feedUrl).render();
  }

  private constructor(feedUrl: string) {
    this.feedView = FeedController.createFeedView();
    this.postModel = new PostModel(feedUrl);
    this.filterModel = new FilterModel();

    this.filterButtons = this.createFilterButtons();
    this.sortButton = this.createSortButton();
  }

  private async render(): Promise<void> {
    await this.postModel.load();
    this.updateFeed(FilterModel.defaultOptions);
    this.listen();
  }

  private static createFeedView(): FeedView {
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

  private updateFilter(type: string): void {
    const options = this.filterModel.updateFilter(type);
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

  private updateSort(update: SortOptions): void {
    const options = this.filterModel.updateSort(update);
    this.updateFeed(options);
  }

  private updateFeed(options: FilterOptions): void {
    const posts = this.postModel.getPosts(options);
    this.feedView.render(posts);
  }

  private listen(): void {
    this.filterButtons.forEach((button) => {
      button.listen();
    });

    this.sortButton.listen();
  }
}
