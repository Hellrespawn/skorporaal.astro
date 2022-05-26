export type SortType = 'alpha' | 'date';
export type SortDir = 'ascending' | 'descending';

export interface FilterOptions {
  filterType?: string;
  filterTitle?: string;
  sortType?: SortType;
  sortDir?: SortDir;
}

export interface SortOptions {
  sortType: SortType;
  sortDir: SortDir;
}

export class FilterModel {
  static defaultOptions: FilterOptions = {
    sortType: 'date',
    sortDir: 'descending',
  };

  private options: FilterOptions = {};

  updateFilter(filterType: string): FilterOptions {
    if (filterType === this.options.filterType) {
      this.options.filterType = undefined;
    } else {
      this.options.filterType = filterType;
    }

    return this.options;
  }

  updateSort(sortOptions: SortOptions): FilterOptions {
    this.options = { ...this.options, ...sortOptions };
    return this.options;
  }
}
