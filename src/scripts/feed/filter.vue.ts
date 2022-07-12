import { reactive } from "vue";

import { type PostCategory } from "../data";

const DEFAULT_CATEGORIES: PostCategory[] = ["article", "portfolio", "other"];
Object.freeze(DEFAULT_CATEGORIES);

function createFilterStore() {
  const activeCategories: PostCategory[] = reactive([...DEFAULT_CATEGORIES]);

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
