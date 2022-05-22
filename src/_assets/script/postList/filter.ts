import { Observable, Subject } from '../observable';

export interface FilterOptions {
  filterType?: string;
  filterTitle?: string;
  sortType?: 'alpha' | 'date';
  sortDir?: 'ascending' | 'descending';
}

export class Filter {
  private options = new Subject({} as FilterOptions);

  getOptions(): Observable<FilterOptions> {
    return this.options;
  }
}
