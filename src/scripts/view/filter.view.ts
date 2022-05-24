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
  private sortButton: SortButtonView;

  constructor(private element: HTMLElement) {
    super();

    this.filterButtons = this.createFilterButtons();
    this.sortButton = this.createSortButton();

    this.render();
  }

  update(value: FilterOptions): void {
    this.next(value);
  }

  createFilterButtons(): FilterButtonView[] {
    const buttons = Object.entries(categoryData).map(
      ([type, { color, name }]) => new FilterButtonView(type, name, color)
    );

    buttons.forEach((button) => button.subscribe(this));

    return buttons;
  }

  createSortButton(): SortButtonView {
    const button = new SortButtonView();
    button.subscribe(this);
    return button;
  }

  render(): void {
    const elems = this.filterButtons.map((button) => button.createElement());

    elems.push(this.sortButton.createElement());

    this.element.replaceChildren(...elems);
  }

  clearFilterButtons(currentType?: string): void {
    this.filterButtons.forEach((button) => {
      if (!currentType || button.type !== currentType) {
        button.clear();
      }
    });
  }
}
