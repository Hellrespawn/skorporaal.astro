import { CATEGORY_DATA } from "@s:data";
import { Post } from "@s:post";

export class FeedItem extends Post {
  get dot(): string {
    return CATEGORY_DATA[this.category].bg;
  }
}
