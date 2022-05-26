import { type Callback } from '../app';
import { type SortOptions } from '../model/filter.model';

type State = { display: string; options: SortOptions };

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

  private state = SortButtonView.states[0];

  constructor(
    private element: HTMLElement,
    private callback: Callback<SortOptions>
  ) {
    this.updateElement();
  }

  listen(): void {
    this.element.addEventListener('click', this.buttonClicked.bind(this));
  }

  private buttonClicked(): void {
    this.cycle();
    this.callback(this.state.options);
  }

  private cycle(): void {
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
