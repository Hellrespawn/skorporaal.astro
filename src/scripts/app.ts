import { FeedController } from './controller/feed.controller';
import DarkMode from './darkMode';

DarkMode.init();

if (window.location.pathname === '/') {
  FeedController.init('/feed.json');
}
