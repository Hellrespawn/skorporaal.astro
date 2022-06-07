const CLASS_NAME = "dark";

const STORAGE_KEY = "darkMode";

export function init() {
  let darkMode: boolean;

  const storedMode = localStorage.getItem(STORAGE_KEY);

  if (storedMode === null) {
    darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  } else {
    darkMode = storedMode === "true";
  }

  if (darkMode) {
    document.documentElement.classList.toggle(CLASS_NAME);
  }
}

export function toggle(): void {
  const toggled = document.documentElement.classList.toggle(CLASS_NAME);

  localStorage.setItem(STORAGE_KEY, toggled.toString());
}
