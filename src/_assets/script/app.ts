import DarkMode from './darkMode';
import { Filter } from './postList/filter';
import { Feed } from './postList/feed';
import { PostList } from './postList';

new DarkMode();
new Filter();

(async () => {
  const listElement = document.getElementById('postList');

  if (listElement) {
    const feed = new Feed('/feed.json');
    const filter = new Filter();

    const postList = new PostList(listElement, feed, filter);

    await postList.load();
  }
})();
