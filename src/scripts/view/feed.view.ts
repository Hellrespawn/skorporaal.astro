/* eslint-disable no-param-reassign */
import type Post from '../post';
import categoryData from '../../11ty/_data/categoryData.json';

const LANGUAGE_MAPS: { [key: string]: { [key: string]: string } } = {
  en: { en: 'English', nl: 'Dutch' },
  nl: { en: 'Engels', nl: 'Nederlands' },
};

/**
 * This class controls the display of posts
 */
export default class FeedView {
  private static postTemplate?: HTMLTemplateElement;

  private lang: string;

  private languageMap: { [key: string]: string };

  constructor(private element: HTMLElement) {
    this.lang = document.documentElement.lang;
    this.languageMap = LANGUAGE_MAPS[this.lang];
  }

  render(posts: Post[]): void {
    const elems = posts.map(this.createPostElement.bind(this));
    this.element.replaceChildren(...elems);
  }

  private createPostElement(post: Post): HTMLElement {
    const template = FeedView.getPostTemplate();

    const clone = template.content.cloneNode(true) as DocumentFragment;

    const element = clone.children[0] as HTMLLIElement;
    this.addAttributesToPostElement(post, element);

    const anchor = element.getElementsByClassName(
      'postUrl'
    )[0] as HTMLAnchorElement;
    anchor.href = post.url;

    // dot
    const dot = element.getElementsByClassName('postDot')[0];
    const { bg } =
      categoryData[post.type as 'recipe' | 'article' | 'portfolio'];

    dot.classList.add(bg);

    // title
    this.setTitle(post, element.getElementsByClassName('postTitle')[0]);

    // date
    const date = element.getElementsByClassName('postDate')[0];
    date.innerHTML = FeedView.formatDate(post.date);

    return element;
  }

  private static getPostTemplate(): HTMLTemplateElement {
    if (!FeedView.postTemplate) {
      FeedView.postTemplate = document.getElementById(
        'postTemplate'
      ) as HTMLTemplateElement;
    }

    return FeedView.postTemplate;
  }

  private addAttributesToPostElement(post: Post, element: HTMLLIElement): void {
    element.classList.add(post.type);
    if (post.lang !== this.lang) {
      element.lang = post.lang;
    }
  }

  private setTitle(post: Post, element: Element): void {
    let { title } = post;

    if (post.lang !== this.lang) {
      title += ` [${this.languageMap[post.lang] ?? 'Unknown'}]`;
    }

    element.textContent = title;
  }

  private static formatDate(date?: Date): string {
    if (date) {
      const formattedDate = date.toLocaleDateString('nl-NL', {
        dateStyle: 'short',
      });

      return `<time datetime="${formattedDate}">${formattedDate}</time>`;
    }

    return 'A long time ago...';
  }
}
