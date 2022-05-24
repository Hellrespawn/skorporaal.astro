export interface FilterOptions {
  filterType?: string;
  filterTitle?: string;
  sortType?: 'alpha' | 'date';
  sortDir?: 'ascending' | 'descending';
}

export class FilterModel {
  static defaultOptions: FilterOptions = {
    sortType: 'date',
    sortDir: 'descending',
  };
  private options = {} as FilterOptions;

  updateOptions(value: FilterOptions): FilterOptions {
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

    return this.options;
  }
}
