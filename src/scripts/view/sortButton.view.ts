import { FilterOptions } from '../model/filter.model';
import { BehaviorSubject } from '../observable';

export class SortButtonView extends BehaviorSubject<FilterOptions> {
  private static buttonTemplate?: HTMLTemplateElement;
  private static states: FilterOptions[] = [
    { sortType: 'date', sortDir: 'descending' },
    { sortType: 'date', sortDir: 'ascending' },
    { sortType: 'alpha', sortDir: 'descending' },
    { sortType: 'alpha', sortDir: 'ascending' },
  ];

  constructor(private state = SortButtonView.states[0]) {
    super(state);
  }

  createElement(): HTMLElement {
    const template = this.getButtonTemplate();

    const clone = template.content.cloneNode(true) as DocumentFragment;

    const element = clone.children[0] as HTMLButtonElement;
    element.addEventListener('click', this.buttonClicked.bind(this));

    const text = element.children[0];
    text.textContent = 'Sort';

    return element;
  }

  private getButtonTemplate(): HTMLTemplateElement {
    if (!SortButtonView.buttonTemplate) {
      SortButtonView.buttonTemplate = document.getElementById(
        'sortButtonTemplate'
      ) as HTMLTemplateElement;
    }

    return SortButtonView.buttonTemplate;
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

    this.state =
      SortButtonView.states[(index + 1) % SortButtonView.states.length];
  }
}
