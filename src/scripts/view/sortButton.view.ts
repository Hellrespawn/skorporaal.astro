import { FilterOptions } from '../model/filter.model';
import { Subject } from '../observable';

export class SortButtonView extends Subject<FilterOptions> {
  private static buttonTemplate?: HTMLTemplateElement;
  private static states: FilterOptions[] = [
    { sortType: 'date', sortDir: 'descending' },
    { sortType: 'date', sortDir: 'ascending' },
    { sortType: 'alpha', sortDir: 'ascending' },
    { sortType: 'alpha', sortDir: 'descending' },
  ];

  private element?: HTMLElement;

  constructor(
    private state = SortButtonView.states[SortButtonView.states.length - 1]
  ) {
    super();
  }

  hookElement(): void {
    this.element = document.getElementById('sortButton')!;
    this.element.addEventListener('click', this.buttonClicked.bind(this));
    this.buttonClicked();
  }

  private buttonClicked(): void {
    this.cycle();
    this.next(this.state);
  }

  private cycle(): void {
    const index = SortButtonView.states.indexOf(this.state);
    if (index === -1) {
      throw new Error('SortButton state is invalid!');
    }

    const newIndex = (index + 1) % SortButtonView.states.length;

    this.setIcon(newIndex);

    this.state = SortButtonView.states[newIndex];
  }

  private setIcon(active: number) {
    for (const iconElement of this.element!.children) {
      const icon = iconElement as HTMLElement;
      const index = +icon.id.split('-')[1];
      if (index === active) {
        icon.style.display = 'flex';
      } else {
        icon.style.display = 'none';
      }
    }
  }
}
