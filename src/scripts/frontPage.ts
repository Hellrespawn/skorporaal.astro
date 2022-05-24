import { Feed } from './model/feed.model';
import { Filter } from './model/filter.model';
import { FeedView } from './view/feed.view';
import { FilterView } from './view/filter.view';

export function loadFrontPage(): void {
  const feedElement = document.getElementById('postFeed');

  if (feedElement) {
    const feedView = new FeedView(feedElement);
    const feedModel = new Feed(feedView, '/feed.json');
    const filterView = new FilterView();
    const filterModel = new Filter(filterView);

    filterModel.subscribe(feedModel);
    filterView.hookElements();
    filterModel.setDefault();
  }
}
