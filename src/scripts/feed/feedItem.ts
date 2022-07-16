import { CATEGORY_DATA, LANGUAGE_DATA, SITE_DATA } from "@s:data";
import { Post } from "@s:post";

export class FeedItem extends Post {
  get dot(): string {
    return CATEGORY_DATA[this.category].bg;
  }

  getFormattedTitle(): string {
    let { title } = this;
    const { lang } = this;

    if (lang !== SITE_DATA.lang) {
      title += ` [${LANGUAGE_DATA[SITE_DATA.lang][lang]}]`;
    }

    return title;
  }
}
