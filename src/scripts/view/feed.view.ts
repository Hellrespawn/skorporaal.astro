import { Post } from '../model/post.model';
import categoryData from '../../11ty/_data/categoryData.json';
import { Observer } from '../observable';

/**
 * This class controls the display of posts
 */
export class FeedView implements Observer<Post[]> {
  private static postTemplate?: HTMLTemplateElement;

  constructor(private element: HTMLElement) {}

  update(posts: Post[]): void {
    this.render(posts);
  }

  private render(posts: Post[]): void {
    const elems = posts.map(this.createPostElement.bind(this));
    this.element.replaceChildren(...elems);
  }

  private createPostElement(post: Post): HTMLElement {
    const template = this.getPostTemplate();

    const clone = template.content.cloneNode(true) as DocumentFragment;

    const element = clone.children[0] as HTMLLIElement;
    element.classList.add(post.type);

    const anchor = element.children[0] as HTMLAnchorElement;
    anchor.href = post.url;

    // dot
    const color =
      categoryData[post.type as 'recipe' | 'article' | 'portfolio'].color;
    anchor.children[0].classList.add(color);

    // title
    // FIXME check documentRoot for language, and add language if it changes.
    anchor.children[1].textContent = post.title;

    //date
    anchor.children[2].innerHTML = this.formatDate(post.date);

    return element;
  }

  private getPostTemplate() {
    if (!FeedView.postTemplate) {
      FeedView.postTemplate = document.getElementById(
        'postTemplate'
      ) as HTMLTemplateElement;
    }

    return FeedView.postTemplate;
  }

  private formatDate(date?: Date): string {
    if (date) {
      const formattedDate = date.toLocaleDateString('nl-NL', {
        dateStyle: 'short',
      });

      return `<time datetime="${formattedDate}">${formattedDate}</time>`;
    }

    return 'A long time ago...';
  }
}
