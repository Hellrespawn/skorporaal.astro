import * as ThemeModel from '../model/theme.model';
import ThemeButtonView from '../view/themeButton.view';

export default class ThemeController {
  private themeButtonView: ThemeButtonView;

  constructor() {
    const element = document.getElementById('darkModeButton')!;
    this.themeButtonView = new ThemeButtonView(element, () => {
      ThemeModel.toggle(true);
    });
  }

  static earlyInit(): void {
    ThemeModel.init();
  }

  render(): void {
    this.themeButtonView.listen();
  }
}
