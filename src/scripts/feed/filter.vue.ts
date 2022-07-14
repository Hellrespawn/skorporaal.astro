import { reactive, watch } from "vue";

import { CATEGORY_DATA, type PostCategory } from "../data";

const DEFAULT_CATEGORIES: PostCategory[] = ["article", "portfolio", "other"];
Object.freeze(DEFAULT_CATEGORIES);
const STORAGE_KEY = "filter";
const SEPARATOR = ";";

function validateCategories(strings: string[]): strings is PostCategory[] {
  const invalidCategories = strings.filter(
    (string) => !(string in CATEGORY_DATA)
  );

  if (invalidCategories.length) {
    console.error(`Found invalid categories: ${invalidCategories}`);
    return false;
  }

  return true;
}

function loadActiveCategories(): PostCategory[] {
  let activeCategories: string[] = [...DEFAULT_CATEGORIES];

  const storedCategoriesString = localStorage.getItem(STORAGE_KEY);

  if (storedCategoriesString) {
    const storedCategories = storedCategoriesString.split(SEPARATOR);

    if (validateCategories(storedCategories)) {
      activeCategories = storedCategories;
    }
  }

  return activeCategories;
}

function saveActiveCategories(activeCategories: PostCategory[]): void {
  localStorage.setItem(STORAGE_KEY, activeCategories.join(SEPARATOR));
}

function createFilterStore() {
  const activeCategories: PostCategory[] = reactive(loadActiveCategories());

  watch(activeCategories, saveActiveCategories);

  return reactive({
    activeCategories,
    toggle(category: PostCategory): void {
      const index = activeCategories.indexOf(category);

      if (index > -1) {
        activeCategories.splice(index, 1);
        if (activeCategories.length === 0) {
          activeCategories.push(...DEFAULT_CATEGORIES);
        }
      } else {
        activeCategories.push(category);
      }
    },
    includes(category: PostCategory): boolean {
      return activeCategories.includes(category);
    },
  });
}

export const filterStore = createFilterStore();
