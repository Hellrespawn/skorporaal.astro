import DarkMode from './darkMode';
import { Feed } from './model/feed.model';
import { Filter } from './model/filter.model';
import { FeedView } from './view/feed.view';
import { FilterView } from './view/filter.view';

new DarkMode();

(async () => {
  const feedElement = document.getElementById('postFeed');
  const filterElement = document.getElementById('filter');

  if (feedElement && filterElement) {
    const feedView = new FeedView(feedElement);
    const feedModel = new Feed(feedView, '/feed.json');
    const filterView = new FilterView(filterElement);
    const filterModel = new Filter(filterView);

    filterModel.subscribe(feedModel);
    filterView.hookElements();
  }
})();
