import { Observable, Observer, Subject } from '../observable';
import { FilterChange } from './filter.view';

export class ButtonView implements Observable<FilterChange> {
  private static buttonTemplate?: HTMLTemplateElement;
  private active: Subject<{ type: string; active: boolean }>;

  constructor(
    private type: string,
    private name: string,
    private color: string
  ) {
    this.active = new Subject({ type: this.type, active: false });
  }

  subscribe(observer: Observer<FilterChange>): void {
    this.active.subscribe(observer);
  }

  createElement(): HTMLElement {
    const template = this.getButtonTemplate();

    const clone = template.content.cloneNode(true) as DocumentFragment;

    const element = clone.children[0] as HTMLButtonElement;
    element.addEventListener('click', this.buttonChanged.bind(this));

    const dot = element.children[0] as HTMLElement;
    dot.classList.add(this.color);

    const text = element.children[1];
    text.textContent = this.name;

    return element;
  }

  getButtonTemplate() {
    if (!ButtonView.buttonTemplate) {
      ButtonView.buttonTemplate = document.getElementById(
        'filterButtonTemplate'
      ) as HTMLTemplateElement;
    }

    return ButtonView.buttonTemplate;
  }

  buttonChanged() {
    const { type, active } = this.active.getValue();
    this.active.next({ type, active: !active });
  }
}
