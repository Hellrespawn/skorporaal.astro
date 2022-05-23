import { Observable, Observer, Subject } from '../observable';
import categoryData from '../../11ty/_data/categoryData.json';

export interface FilterOptions {
  filterType?: string;
  filterTitle?: string;
  sortType?: 'alpha' | 'date';
  sortDir?: 'ascending' | 'descending';
}

export class Filter implements Observable<FilterOptions> {
  private options = new Subject({} as FilterOptions);

  constructor(private element: HTMLElement) {}

  render() {
    const buttons = Object.entries(categoryData).map(
      ([type, { color, name }]) =>
        new FilterButton(type, color, name, this.filterChanged.bind(this))
    );

    this.element.replaceChildren(...buttons.map((button) => button.render()));
  }

  filterChanged(button: FilterButton): void {
    const options = this.options.getValue();

    if (options.filterType === button.type) {
      options.filterType = undefined;
    } else {
      options.filterType = button.type;
    }

    this.options.next(options);
  }

  subscribe(observer: Observer<FilterOptions>): void {
    this.options.subscribe(observer);
  }
}

class FilterButton {
  private static classes = ['opacity-50'];
  private static template?: HTMLTemplateElement;

  private element?: HTMLElement;

  constructor(
    public type: string,
    private color: string,
    private name: string,
    private callback: (button: FilterButton) => void
  ) {}

  render(): HTMLElement {
    if (!FilterButton.template) {
      FilterButton.template = document.getElementById(
        'filterButtonTemplate'
      ) as HTMLTemplateElement;
    }

    const clone = FilterButton.template.content.cloneNode(
      true
    ) as DocumentFragment;

    const element = clone.children[0] as HTMLButtonElement;

    element.addEventListener('click', this.click.bind(this));

    const dot = element.children[0] as HTMLElement;
    dot.classList.add(this.color);

    const text = element.children[1];
    text.textContent = this.name;

    this.element = element;
    return element;
  }

  click(): void {
    FilterButton.classes.forEach((className) =>
      this.element!.classList.toggle(className)
    );

    this.callback(this);
  }

  clear(): void {
    FilterButton.classes.forEach((className) =>
      this.element!.classList.remove(className)
    );
  }
}
