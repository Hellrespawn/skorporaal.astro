import { type Callback } from '../app';
import { type SortOptions } from '../model/filter.model';

export type State = { display: string; options: SortOptions };

export default class SortButtonView {
  private static states: State[] = [
    {
      display: 'Date ↓',
      options: { sortType: 'date', sortDir: 'descending' },
    },
    {
      display: 'Date ↑',
      options: { sortType: 'date', sortDir: 'ascending' },
    },
    {
      display: 'A-Z ↑',
      options: { sortType: 'alpha', sortDir: 'ascending' },
    },
    {
      display: 'Z-A ↓',
      options: { sortType: 'alpha', sortDir: 'descending' },
    },
  ];

  private state;

  constructor(
    private element: HTMLElement,
    private callback: Callback<SortOptions>,
    sortOptions: SortOptions
  ) {
    this.state = SortButtonView.getInitialState(sortOptions);

    this.updateElement();
  }

  listen(): void {
    this.element.addEventListener('click', this.buttonClicked.bind(this));
  }

  private static getInitialState(sortOptions: SortOptions): State {
    const state = SortButtonView.states.find(
      (sortState) =>
        sortState.options.sortType === sortOptions.sortType &&
        sortState.options.sortDir === sortOptions.sortDir
    );

    if (!state) {
      throw new Error(`Invalid sorter state: ${sortOptions.toString()}`);
    }

    return state;
  }

  private buttonClicked(): void {
    this.cycleState();
    this.callback(this.state.options);
  }

  private cycleState(): void {
    const index = SortButtonView.states.indexOf(this.state);
    if (index === -1) {
      throw new Error('SortButton state is invalid!');
    }

    const newIndex = (index + 1) % SortButtonView.states.length;

    this.state = SortButtonView.states[newIndex];
    this.updateElement();
  }

  private updateElement(): void {
    this.element.textContent = this.state.display;
  }
}
