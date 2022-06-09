import { writable } from "svelte/store";
import { PostCategory } from "../data";

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

        console.log(activeCategories);
        return activeCategories;
      });
    },
  };
}

export const filter = createFilter();
