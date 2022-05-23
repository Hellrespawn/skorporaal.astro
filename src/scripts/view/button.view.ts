import { FilterOptions } from '../model/filter.model';
import { Subject } from '../observable';

export class ButtonView extends Subject<FilterOptions> {
  private static classes = ['opacity-50'];
  private static buttonTemplate?: HTMLTemplateElement;
  private element?: HTMLElement;

  constructor(
    public type: string,
    private name: string,
    private color: string
  ) {
    super();
  }

  createElement(): HTMLElement {
    const template = this.getButtonTemplate();

    const clone = template.content.cloneNode(true) as DocumentFragment;

    const element = clone.children[0] as HTMLButtonElement;
    element.addEventListener('click', this.buttonClicked.bind(this));

    const dot = element.children[0] as HTMLElement;
    dot.classList.add(this.color);

    const text = element.children[1];
    text.textContent = this.name;

    this.element = element;
    return element;
  }

  private set(): void {
    this.element?.classList.remove(...ButtonView.classes);
  }

  clear(): void {
    this.element?.classList.add(...ButtonView.classes);
  }

  private getButtonTemplate(): HTMLTemplateElement {
    if (!ButtonView.buttonTemplate) {
      ButtonView.buttonTemplate = document.getElementById(
        'filterButtonTemplate'
      ) as HTMLTemplateElement;
    }

    return ButtonView.buttonTemplate;
  }

  private buttonClicked(): void {
    this.set();
    this.next({ filterType: this.type });
  }
}
