export default class DarkMode {
  private darkModeIcon = document.getElementById('darkModeIcon')!;
  private lightModeIcon = document.getElementById('lightModeIcon')!;
  private darkModeDisplay = this.darkModeIcon.style.display;
  private lightModeDisplay = this.lightModeIcon.style.display;
  private darkModeClassName = 'dark';
  private storageKey = 'darkMode';

  static init(): void {
    new DarkMode();
  }

  private constructor() {
    let darkMode: boolean;

    const storedMode = localStorage.getItem(this.storageKey);

    if (storedMode === null) {
      darkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      darkMode = storedMode === 'true';
    }
    if (darkMode) {
      this.toggle(false);
    } else {
      this.clear(false);
    }

    const darkModeButton = document.getElementById('darkModeButton')!;

    darkModeButton.addEventListener('click', () => this.toggle(true));
    darkModeButton.addEventListener('keydown', (event) => {
      event.key === 'Enter' && this.toggle(true);
    });
  }

  private toggle(write: boolean): void {
    if (document.documentElement.classList.toggle(this.darkModeClassName)) {
      this.set(write);
    } else {
      this.clear(write);
    }
  }

  private set(write: boolean): void {
    this.darkModeIcon.style.display = 'none';
    this.lightModeIcon.style.display = this.lightModeDisplay;
    write && localStorage.setItem(this.storageKey, 'true');
  }

  private clear(write: boolean): void {
    this.darkModeIcon.style.display = this.darkModeDisplay;
    this.lightModeIcon.style.display = 'none';
    write && localStorage.setItem(this.storageKey, 'false');
  }
}
