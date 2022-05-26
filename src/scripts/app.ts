import FeedController from './controller/feed.controller';
import ThemeController from './controller/theme.controller';

export type Callback<T> = (value: T) => void;

ThemeController.init();

if (window.location.pathname === '/') {
  FeedController.init('/feed.json').catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
}
