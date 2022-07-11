import { ref } from "vue";

import { type PostCategory } from "../data";

// TODO Persist filter to localStorage

function createFilterStore() {
  const defaultCategories: PostCategory[] = ["article", "portfolio", "other"];
  const activeCategories = ref([...defaultCategories]);

  return {
    activeCategories,
    toggle(category: PostCategory): void {
      const index = activeCategories.value.indexOf(category);

      if (index > -1) {
        activeCategories.value.splice(index, 1);
        if (activeCategories.value.length === 0) {
          activeCategories.value.push(...defaultCategories);
        }
      } else {
        activeCategories.value.push(category);
      }
    },
    includes(category: PostCategory): boolean {
      return activeCategories.value.includes(category);
    },
  };
}

export const filterStore = createFilterStore();
