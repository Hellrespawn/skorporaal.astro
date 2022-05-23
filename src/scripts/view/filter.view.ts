import { FilterOptions } from '../model/filter.model';
import categoryData from '../../11ty/_data/categoryData.json';
import { ButtonView } from './button.view';
import { Observer, Subject } from '../observable';

export class FilterView
  extends Subject<FilterOptions>
  implements Observer<FilterOptions>
{
  private buttons: ButtonView[];

  constructor(private element: HTMLElement) {
    super();

    this.buttons = Object.entries(categoryData).map(
      ([type, { color, name }]) => new ButtonView(type, name, color)
    );

    this.render();

    this.buttons.forEach((button) => button.subscribe(this));
  }

  update(value: FilterOptions): void {
    this.next(value);
  }

  clearButtons(currentType?: string): void {
    this.buttons.forEach((button) => {
      if (!currentType || button.type !== currentType) {
        button.clear();
      }
    });
  }

  render(): void {
    const elems = this.buttons.map((button) => button.createElement());

    this.element.replaceChildren(...elems);
  }
}
