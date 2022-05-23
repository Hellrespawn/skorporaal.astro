import categoryData from '../../11ty/_data/categoryData.json';

export class Post {
  private static template?: HTMLTemplateElement;
  date?: Date;

  constructor(
    public title: string,
    public type: string,
    private lang: string,
    private url: string,
    date?: string
  ) {
    this.date = date ? new Date(date) : undefined;
  }

  renderPost(): HTMLLIElement {
    if (!Post.template) {
      Post.template = document.getElementById(
        'postTemplate'
      ) as HTMLTemplateElement;
    }

    const clone = Post.template.content.cloneNode(true) as DocumentFragment;

    const element = clone.children[0] as HTMLLIElement;

    element.classList.add(this.type);

    const anchor = element.children[0] as HTMLAnchorElement;
    anchor.href = this.url;

    // dot
    const color =
      categoryData[this.type as 'recipe' | 'article' | 'portfolio'].color;
    anchor.children[0].classList.add(color);

    // title
    // FIXME check documentRoot for language, and add language if it changes.
    anchor.children[1].textContent = this.title;

    //date
    anchor.children[2].innerHTML = this.formatDate();

    return element;
  }

  private formatDate(): string {
    if (this.date) {
      const formattedDate = this.date.toLocaleDateString('nl-NL', {
        dateStyle: 'short',
      });

      return `<time datetime="${formattedDate}">${formattedDate}</time>`;
    }

    return 'A long time ago...';
  }
}
