import { Callback } from '../controller/feed.controller';
import { FilterOptions } from '../model/filter.model';

export class FilterButtonView {
  private static classes = ['inactive'];

  constructor(
    private element: HTMLElement,
    private callback: Callback<FilterOptions>,
    public type: string
  ) {}

  listen(): void {
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
    this.callback({ filterType: this.type });
  }
}
