import { FilterOptions } from '../model/filter.model';
import { Subject } from '../observable';

export abstract class ButtonView extends Subject<FilterOptions> {
  private static classes = ['opacity-50'];

  constructor(protected element: HTMLElement) {
    super();
  }

  hookElement(): void {
    this.element.addEventListener('click', this.buttonClicked.bind(this));
  }

  private set(): void {
    this.element.classList.remove(...ButtonView.classes);
  }

  clear(): void {
    this.element.classList.add(...ButtonView.classes);
  }

  protected buttonClicked(): void {
    this.set();
    this.next(this.getValue());
  }

  abstract getValue(): FilterOptions;
}
