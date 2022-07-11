import { writable } from "svelte/store";
import { reactive, ref } from "vue";

import { type PostCategory } from "../data";

function createFilter() {
  const defaultCategories: PostCategory[] = ["article", "portfolio", "other"];
  const activeCategories = [...defaultCategories];

  const { subscribe, update } = writable(activeCategories);

  return {
    subscribe,
    toggle(category: PostCategory): void {
      update((activeCategories) => {
        const index = activeCategories.indexOf(category);

        if (index > -1) {
          activeCategories.splice(index, 1);
          if (activeCategories.length === 0) {
            activeCategories.push(...defaultCategories);
          }
        } else {
          activeCategories.push(category);
        }

        return activeCategories;
      });
    },
  };
}

function createFilterStore() {
  const defaultCategories: PostCategory[] = ["article", "portfolio", "other"];
  const activeCategories = ref([...defaultCategories]);

  return reactive({
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
  });
}

export const filter = createFilter();
export const filterStore = createFilterStore();
