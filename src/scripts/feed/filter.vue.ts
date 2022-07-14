import { reactive, watch } from "vue";

import { CATEGORY_DATA, type PostCategory } from "../data";

const DEFAULT_CATEGORIES: PostCategory[] = ["article", "portfolio", "other"];

const STORAGE_KEY = "filter";

const SEPARATOR = ";";

function getInvalidCategories(strings: string[]): string[] {
  return strings.filter((string) => !(string in CATEGORY_DATA));
}

function loadActiveCategories(): PostCategory[] {
  let activeCategories: PostCategory[] = [...DEFAULT_CATEGORIES];

  const storedCategoriesString = localStorage.getItem(STORAGE_KEY);

  if (storedCategoriesString) {
    const storedCategories = storedCategoriesString.split(SEPARATOR);

    const invalidCategories = getInvalidCategories(storedCategories);

    if (invalidCategories.length) {
      console.error(`Found invalid categories: ${invalidCategories}`);
    } else {
      activeCategories = storedCategories as PostCategory[];
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

  return {
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
  };
}

export const filterStore = createFilterStore();
