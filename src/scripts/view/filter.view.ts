import { FilterOptions } from '../model/filter.model';
import categoryData from '../../11ty/_data/categoryData.json';
import { FilterButtonView } from './filterButton.view';
import { Observer, Subject } from '../observable';
import { SortButtonView } from './sortButton.view';

export class FilterView
  extends Subject<FilterOptions>
  implements Observer<FilterOptions>
{
  private filterButtons: FilterButtonView[];
  private sortButtons: SortButtonView[];

  constructor(private element: HTMLElement) {
    super();

    this.filterButtons = this.createFilterButtons();
    this.sortButtons = this.createSortButtons();
  }

  update(value: FilterOptions): void {
    this.next(value);
  }

  createFilterButtons(): FilterButtonView[] {
    const buttons = Object.keys(categoryData).map((type) => {
      const element = document.getElementById(`${type}FilterButton`)!;
      return new FilterButtonView(element, type);
    });

    buttons.forEach((button) => button.subscribe(this));

    return buttons;
  }

  createSortButtons(): SortButtonView[] {
    const sortAlphaElem = document.getElementById('sortAlphaButton')!;
    const sortDateElem = document.getElementById('sortDateButton')!;
    const sortAlphaButton = new SortButtonView(sortAlphaElem, 'alpha');
    const sortDateButton = new SortButtonView(sortDateElem, 'date');
    sortAlphaButton.subscribe(this);
    sortDateButton.subscribe(this);
    return [sortAlphaButton, sortDateButton];
  }

  hookElements(): void {
    this.filterButtons.forEach((button) => button.hookElement());
    this.sortButtons.forEach((button) => button.hookElement());
  }

  clearFilterButtons(currentType?: string): void {
    this.filterButtons.forEach((button) => {
      if (!currentType || button.type !== currentType) {
        button.clear();
      }
    });
  }

  clearSortButtons(currentType?: string): void {
    this.sortButtons.forEach((button) => {
      if (!currentType || button.type !== currentType) {
        button.clear();
      }
    });
  }
}
