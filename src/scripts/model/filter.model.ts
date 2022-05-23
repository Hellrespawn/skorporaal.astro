import { Observer, Subject } from '../observable';
import { FilterView } from '../view/filter.view';

export interface FilterOptions {
  filterType?: string;
  filterTitle?: string;
  sortType?: 'alpha' | 'date';
  sortDir?: 'ascending' | 'descending';
}

export class FilterModel
  extends Subject<FilterOptions>
  implements Observer<FilterOptions>
{
  private options = {} as FilterOptions;

  constructor(private view: FilterView) {
    super();
    view.subscribe(this);
  }

  update(value: FilterOptions): void {
    if (value.filterType === this.options.filterType) {
      value.filterType = undefined;
    }

    this.view.clearButtons(value.filterType);

    this.options = { ...this.options, ...value };

    this.next(this.options);
  }
}
