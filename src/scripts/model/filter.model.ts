import { Observer, Subject } from '../observable';
import { FilterChange, FilterView } from '../view/filter.view';

export interface FilterOptions {
  filterType?: string;
  filterTitle?: string;
  sortType?: 'alpha' | 'date';
  sortDir?: 'ascending' | 'descending';
}

export class FilterModel
  extends Subject<FilterOptions>
  implements Observer<FilterChange>
{
  private options = {} as FilterOptions;

  constructor(view: FilterView) {
    super({});
    view.subscribe(this);
  }

  update(value: FilterChange): void {
    console.log("FilterChange:", value)
    if (this.options.filterType === value.type) {
      this.options.filterType = undefined;
    } else {
      this.options.filterType = value.type;
    }

    this.next(this.options);
  }
}
