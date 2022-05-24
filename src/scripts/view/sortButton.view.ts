import { FilterOptions } from '../model/filter.model';
import { Subject } from '../observable';

type State = { display: string; options: FilterOptions };

export class SortButtonView extends Subject<FilterOptions> {
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

  constructor(
    private element: HTMLElement,
    private state = SortButtonView.states[0]
  ) {
    super();
    this.updateElement();
  }

  hookElement(): void {
    this.element = document.getElementById('sortButton')!;
    this.element.addEventListener('click', this.buttonClicked.bind(this));
  }

  private buttonClicked(): void {
    this.cycle();
    this.next(this.state.options);
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

  private updateElement() {
    this.element.textContent = this.state.display;

    return;
  }
}
