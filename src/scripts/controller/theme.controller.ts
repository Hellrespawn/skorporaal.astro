import ThemeModel from '../model/theme.model';
import ThemeButtonView from '../view/themeButton.view';

export default class ThemeController {
  private themeButtonView: ThemeButtonView;

  static init(): void {
    new ThemeController().render();
  }

  private constructor() {
    const element = document.getElementById('darkModeButton')!;
    this.themeButtonView = new ThemeButtonView(element, () =>
      ThemeModel.toggle(true)
    );
  }

  render(): void {
    this.themeButtonView.listen();
  }

  static earlyInit(): void {
    ThemeModel.init();
  }
}
