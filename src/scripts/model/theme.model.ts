export default class ThemeModel {
  private static darkModeClassName = 'dark';

  private static storageKey = 'darkMode';

  static init() {
    let darkMode: boolean;

    const storedMode = localStorage.getItem(this.storageKey);

    if (storedMode === null) {
      darkMode = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    } else {
      darkMode = storedMode === 'true';
    }

    if (darkMode) {
      document.documentElement.classList.toggle(ThemeModel.darkModeClassName);
    }
  }

  static toggle(write: boolean): void {
    const toggled = document.documentElement.classList.toggle(
      ThemeModel.darkModeClassName
    );
    if (write) {
      localStorage.setItem(ThemeModel.storageKey, toggled.toString());
    }
  }
}
