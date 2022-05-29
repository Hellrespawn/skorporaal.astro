import FeedController from './controller/feed.controller';
import ThemeController from './controller/theme.controller';

export type Callback<T> = (value: T) => void;

new ThemeController().render();

if (window.location.pathname === '/') {
  const controller = new FeedController('/feed.json', ['article', 'portfolio']);

  controller.render().catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
}
