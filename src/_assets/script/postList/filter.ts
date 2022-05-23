import { Observable, Observer, Subject } from '../observable';

export interface FilterOptions {
  filterType?: string;
  filterTitle?: string;
  sortType?: 'alpha' | 'date';
  sortDir?: 'ascending' | 'descending';
}

export class Filter implements Observable<FilterOptions> {
  private options = new Subject({} as FilterOptions);

  subscribe(observer: Observer<FilterOptions>): void {
    this.options.subscribe(observer);
  }
}
