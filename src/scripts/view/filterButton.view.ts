import { type Callback } from '../app';

export default class FilterButtonView {
  private static classes = ['button-dark'];

  constructor(
    private element: HTMLElement,
    private callback: Callback<string>,
    public type: string,
    activeTypes: string[]
  ) {
    this.set(activeTypes);
  }

  listen(): void {
    this.element.addEventListener('click', this.buttonClicked.bind(this));
  }

  set(activeTypes: string[]): void {
    if (activeTypes.includes(this.type)) {
      this.element.classList.remove(...FilterButtonView.classes);
    } else {
      this.element.classList.add(...FilterButtonView.classes);
    }
  }

  private buttonClicked(): void {
    this.callback(this.type);
  }
}
