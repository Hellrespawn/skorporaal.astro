import { type Callback } from '../app';

export default class ThemeButtonView {
  constructor(private element: HTMLElement, private callback: Callback<void>) {}

  listen(): void {
    this.element.addEventListener('click', this.buttonClicked.bind(this));

    this.element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.buttonClicked.bind(this);
      }
    });
  }

  private buttonClicked(): void {
    this.callback();
  }
}
