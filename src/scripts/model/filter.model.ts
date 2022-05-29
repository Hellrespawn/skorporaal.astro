import categoryData from '../../11ty/_data/categoryData.json';

export type SortType = 'alpha' | 'date';
export type SortDirection = 'ascending' | 'descending';

export class FilterState {
  private static types = Object.keys(categoryData);

  private filteredTypes!: string[];

  sortType: SortType = 'date';

  sortDir: SortDirection = 'descending';

  constructor(private defaultTypes: string[] = FilterState.types.slice()) {
    this.resetFilter();
  }

  private resetFilter() {
    this.filteredTypes = this.defaultTypes.slice();
  }

  getActiveTypes(): string[] {
    const activeTypes = this.filteredTypes.length
      ? this.filteredTypes
      : FilterState.types;

    return activeTypes;
  }

  addType(type: string) {
    const index = this.filteredTypes.indexOf(type);

    if (index > -1) {
      this.filteredTypes.splice(index, 1);
    } else {
      this.filteredTypes.push(type);
    }

    if (this.filteredTypes.length === 0) {
      this.resetFilter();
    }
  }
}

export interface SortOptions {
  sortType: SortType;
  sortDir: SortDirection;
}

export class FilterModel {
  private static storageKey = 'filter-state';

  private state: FilterState;

  constructor(defaultTypes?: string[]) {
    this.state = new FilterState(defaultTypes);

    this.loadState();
  }

  getState(): FilterState {
    return this.state;
  }

  getActiveTypes(): string[] {
    return this.getState().getActiveTypes();
  }

  getSortOptions(): SortOptions {
    const state = this.getState();
    return { sortDir: state.sortDir, sortType: state.sortType };
  }

  updateFilter(filterType: string): FilterState {
    this.state.addType(filterType);

    this.saveState();

    return this.state;
  }

  updateSort(sortOptions: SortOptions): FilterState {
    this.state.sortDir = sortOptions.sortDir ?? this.state.sortDir;
    this.state.sortType = sortOptions.sortType ?? this.state.sortType;

    this.saveState();

    return this.state;
  }

  loadState() {
    const state = sessionStorage.getItem(FilterModel.storageKey);

    if (state) {
      Object.assign(this.state, JSON.parse(state));
    }
  }

  saveState() {
    sessionStorage.setItem(FilterModel.storageKey, JSON.stringify(this.state));
  }
}
