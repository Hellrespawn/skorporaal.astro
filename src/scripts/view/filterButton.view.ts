import { type Callback } from '../app';

export default class FilterButtonView {
  private static classes = ['button-dark'];

  constructor(
    private element: HTMLElement,
    private callback: Callback<string>,
    public type: string
  ) {}

  listen(): void {
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
    this.callback(this.type);
  }
}
