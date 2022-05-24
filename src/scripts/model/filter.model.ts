import { Observer, Subject } from '../observable';
import { FilterView } from '../view/filter.view';

export interface FilterOptions {
  filterType?: string;
  filterTitle?: string;
  sortType?: 'alpha' | 'date';
  sortDir?: 'ascending' | 'descending';
}

export class Filter
  extends Subject<FilterOptions>
  implements Observer<FilterOptions>
{
  private options = {} as FilterOptions;

  constructor(private view: FilterView) {
    super();
    view.subscribe(this);
  }

  update(value: FilterOptions): void {
    if (value.filterType && value.filterType === this.options.filterType) {
      value.filterType = undefined;
    }

    if (value.sortType) {
      if (value.sortType === this.options.sortType) {
        value.sortDir =
          this.options.sortDir === 'ascending' ? 'descending' : 'ascending';
      } else {
        if (value.sortType === 'alpha') {
          this.options.sortDir = 'ascending';
        } else {
          this.options.sortDir = 'descending';
        }
      }
    }

    this.options = { ...this.options, ...value };
    console.log(this.options);
    this.view.clearFilterButtons(this.options.filterType);
    this.view.clearSortButtons(this.options.sortType);

    this.next(this.options);
  }

  setDefault(): void {
    this.update({ sortType: 'date', sortDir: 'descending' });
  }
}
