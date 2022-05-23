import { FilterModel } from '../model/filter.model';
import categoryData from '../../11ty/_data/categoryData.json';
import { ButtonView } from './button.view';
import { Observer, Subject } from '../observable';

export interface FilterChange {
  type: string;
  active: boolean;
}

export class FilterView
  extends Subject<FilterChange>
  implements Observer<FilterChange>
{
  buttons: ButtonView[];

  constructor(private element: HTMLElement) {
    super({ type: 'test', active: false });

    this.buttons = Object.entries(categoryData).map(
      ([type, { color, name }]) => new ButtonView(type, name, color)
    );
  }

  update(value: FilterChange): void {
    this.next(value);
  }

  render(): void {
    this.buttons.forEach((button) => button.subscribe(this));

    const elems = this.buttons.map((button) => button.createElement());

    this.element.replaceChildren(...elems);
  }
}
