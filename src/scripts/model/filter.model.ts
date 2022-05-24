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
    console.log(value);
    if (value.filterType && value.filterType === this.options.filterType) {
      value.filterType = undefined;
    }

    this.options = { ...this.options, ...value };
    this.view.clearFilterButtons(this.options.filterType);

    this.next(this.options);
  }
}
