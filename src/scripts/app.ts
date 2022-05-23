import DarkMode from './darkMode';
import { FeedModel } from './model/feed.model';
import { FilterModel } from './model/filter.model';
import { FeedView } from './view/feed.view';
import { FilterView } from './view/filter.view';

new DarkMode();

(async () => {
  const feedElement = document.getElementById('postFeed');
  const filterElement = document.getElementById('filter');

  if (feedElement && filterElement) {
    const feedView = new FeedView(feedElement);
    const feedModel = new FeedModel(feedView, '/feed.json');
    const filterView = new FilterView(filterElement);
    const filterModel = new FilterModel(filterView);

    filterModel.subscribe(feedModel);

    feedModel.getPosts();
  }
})();
