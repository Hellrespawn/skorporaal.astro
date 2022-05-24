import { FilterOptions } from '../model/filter.model';
import { ButtonView } from './button.view';

export class SortButtonView extends ButtonView {
  constructor(element: HTMLElement, public type: 'alpha' | 'date') {
    super(element);
  }

  getValue(): FilterOptions {
    return { sortType: this.type };
  }
}
