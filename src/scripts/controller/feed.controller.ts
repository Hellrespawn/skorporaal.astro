import categoryData from '../../11ty/_data/categoryData.json';
import { FilterModel, type SortOptions } from '../model/filter.model';
import PostModel from '../model/post.model';
import FeedView from '../view/feed.view';
import FilterButtonView from '../view/filterButton.view';
import SortButtonView from '../view/sortButton.view';

export default class FeedController {
  private postModel: PostModel;

  private filterModel: FilterModel;

  private feedView: FeedView;

  private filterButtons: FilterButtonView[];

  private sortButton: SortButtonView;

  constructor(feedUrl: string, defaultTypes?: string[]) {
    this.postModel = new PostModel(feedUrl);
    this.filterModel = new FilterModel(defaultTypes);

    this.feedView = FeedController.createFeedView();
    this.filterButtons = this.createFilterButtons();
    this.sortButton = this.createSortButton();
  }

  async render(): Promise<void> {
    await this.postModel.load();
    this.updateFeed();
    this.listen();
  }

  private static createFeedView(): FeedView {
    const feedElement = document.getElementById('postFeed')!;
    return new FeedView(feedElement);
  }

  private createFilterButtons(): FilterButtonView[] {
    const buttons = Object.keys(categoryData).map((type) => {
      const element = document.getElementById(`${type}FilterButton`)!;
      return new FilterButtonView(
        element,
        this.updateFilter.bind(this),
        type,
        this.filterModel.getActiveTypes()
      );
    });

    return buttons;
  }

  private updateFilter(type: string): void {
    this.filterModel.updateFilter(type);
    this.updateFilterButtons();
    this.updateFeed();
  }

  private updateFilterButtons(): void {
    this.filterButtons.forEach((button) =>
      button.set(this.filterModel.getActiveTypes())
    );
  }

  private createSortButton(): SortButtonView {
    const element = document.getElementById('sortButton')!;
    const button = new SortButtonView(
      element,
      this.updateSort.bind(this),
      this.filterModel.getSortOptions()
    );
    return button;
  }

  private updateSort(update: SortOptions): void {
    this.filterModel.updateSort(update);
    this.updateFeed();
  }

  private updateFeed(): void {
    const posts = this.postModel.getPosts(this.filterModel.getState());
    this.feedView.render(posts);
  }

  private listen(): void {
    this.filterButtons.forEach((button) => {
      button.listen();
    });

    this.sortButton.listen();
  }
}
