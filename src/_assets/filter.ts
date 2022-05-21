export default class Filter {
  buttons: { [key: string]: FilterButton };
  filter = '';
  posts: Post[];

  constructor() {
    // Create button objects, add callbacks to buttons
    this.buttons = {
      article: new FilterButton('filterArticle', () => this.toggle('article')),
      portfolio: new FilterButton('filterPortfolio', () =>
        this.toggle('portfolio')
      ),
      recipe: new FilterButton('filterRecipe', () => this.toggle('recipe')),
    };

    // Get post elements
    this.posts = [...document.getElementById('postList')!.children].map(
      (element) => new Post(element as HTMLElement)
    );
  }

  /**
   * Callback function for `FilterButton`s. Toggles or clears the filter and
   * filters posts.
   *
   * @param type - type of post to filter on.
   */
  private toggle(type: string): void {
    if (this.filter === type) {
      this.clear();
    } else {
      this.set(type);
    }

    this.posts.forEach((post) => post.filter(this.filter));
  }

  /**
   * Sets the filter and deactivates other buttons.
   *
   * @param type - type of post to filter on.
   */
  private set(type: string): void {
    this.filter = type;

    Object.entries(this.buttons).forEach(([type, button]) => {
      if (this.filter !== type) {
        button.clear();
      }
    });
  }

  /**
   * Clear the filter and all buttons.
   */
  private clear(): void {
    this.filter = '';
    Object.values(this.buttons).forEach((button) => button.clear());
  }
}

class FilterButton {
  private static classes = ['opacity-50'];
  private element: HTMLElement;
  private callback: () => void;

  constructor(idSelector: string, callback: () => void) {
    this.element = document.getElementById(idSelector)!;
    this.callback = callback;
    this.element.addEventListener('click', () => this.toggle());
    this.element.addEventListener('keydown', (event) => {
      event.key === 'Enter' && this.toggle();
    });
  }

  public toggle(): void {
    if (this.active()) {
      this.clear();
    } else {
      this.set();
    }
    this.callback();
  }

  private active(): boolean {
    return !FilterButton.classes.every((className) =>
      this.element.classList.contains(className)
    );
  }

  private set(): void {
    this.element.classList.remove(...FilterButton.classes);
  }

  public clear(): void {
    this.element.classList.add(...FilterButton.classes);
  }
}

class Post {
  private element: HTMLElement;
  private display: string;

  constructor(element: HTMLElement) {
    this.element = element;
    this.display = element.style.display;
  }

  public filter(type: string): void {
    if (!type || this.element.classList.contains(type)) {
      this.show();
    } else {
      this.hide();
    }
  }

  private hide(): void {
    this.element.style.display = 'none';
  }

  private show(): void {
    this.element.style.display = this.display;
  }
}
