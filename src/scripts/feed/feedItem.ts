import { CATEGORY_DATA, LANGUAGE_DATA } from "@s:data";
import { Post } from "@s:post";

export class FeedItem extends Post {
  get dot(): string {
    return CATEGORY_DATA[this.category].bg;
  }

  getFormattedTitle(documentLang: string): string {
    let { title } = this;
    const { lang } = this;

    if (lang !== documentLang) {
      title += ` [${LANGUAGE_DATA[documentLang][lang]}]`;
    }

    return title;
  }
}
