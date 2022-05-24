import { FilterOptions } from '../model/filter.model';
import { Subject } from '../observable';

export class FilterButtonView extends Subject<FilterOptions> {
  private static classes = ['opacity-50'];

  constructor(private element: HTMLElement, public type: string) {
    super();
  }

  hookElement(): void {
    this.element = document.getElementById(`${this.type}FilterButton`)!;
    this.element.addEventListener('click', this.buttonClicked.bind(this));
  }

  private set(): void {
    this.element?.classList.remove(...FilterButtonView.classes);
  }

  clear(): void {
    this.element?.classList.add(...FilterButtonView.classes);
  }

  private buttonClicked(): void {
    this.set();
    this.next({ filterType: this.type });
  }
}
