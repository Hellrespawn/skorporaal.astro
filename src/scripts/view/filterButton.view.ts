import { FilterOptions } from '../model/filter.model';
import { ButtonView } from './button.view';

export class FilterButtonView extends ButtonView {
  constructor(element: HTMLElement, public type: string) {
    super(element);
  }

  getValue(): FilterOptions {
    return { filterType: this.type };
  }
}
