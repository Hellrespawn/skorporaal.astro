import DarkMode from './darkMode';
import { Filter } from './postList/filter';
import { Feed } from './postList/feed';
import { PostList } from './postList';

new DarkMode();

(async () => {
  const listElement = document.getElementById('postList');
  const filterElement = document.getElementById('filter');

  if (listElement && filterElement) {
    const feed = new Feed('/feed.json');
    const filter = new Filter(filterElement);

    const postList = new PostList(listElement, feed, filter);

    filter.render();
    await postList.load();
  }
})();
