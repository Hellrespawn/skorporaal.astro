import { atom, onSet, action, computed, WritableAtom } from 'nanostores';
import { useStore } from '@nanostores/vue';

import { CATEGORY_DATA, type PostCategory } from '../data';
import type { FeedItem } from '../post';

const DEFAULT_CATEGORIES: PostCategory[] = ['article', 'portfolio', 'other'];
const STORAGE_KEY = 'filter';
const SEPARATOR = ';';

/**
 * Validate that strings are PostCategories.
 */
function getInvalidCategories(strings: string[]): string[] {
  return strings.filter((string) => !(string in CATEGORY_DATA));
}

/**
 * Attempts to load active categories from localStorage.
 */
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

/**
 * Saves active categories to localStorage.
 */
function saveActiveCategories(activeCategories: PostCategory[]): void {
  localStorage.setItem(STORAGE_KEY, activeCategories.join(SEPARATOR));
}

/**
 * Creates `includes` function.
 */
function createIncludesFunction(
  activeCategories: PostCategory[]
): (category: PostCategory) => boolean {
  return (category: PostCategory) => activeCategories.includes(category);
}

/**
 * Creates filter callback function.
 */
function createFilterFunction(activeCategories: PostCategory[]) {
  return (feedItem: FeedItem) => activeCategories.includes(feedItem.category);
}

/**
 * Function that toggles category.
 */
function toggleFunction(
  store: WritableAtom<PostCategory[]>,
  category: PostCategory
) {
  const activeCategories = store.get();

  const index = activeCategories.indexOf(category);

  if (index > -1) {
    activeCategories.splice(index, 1);
    if (activeCategories.length === 0) {
      activeCategories.push(...DEFAULT_CATEGORIES);
    }
  } else {
    activeCategories.push(category);
  }

  store.set(activeCategories);
}

/**
 * Create instance of filter store.
 */
function createFilterStore() {
  const activeCategories = atom(loadActiveCategories());

  onSet(activeCategories, ({ newValue }) => {
    saveActiveCategories(newValue);
  });

  return {
    filterFunction: useStore(computed(activeCategories, createFilterFunction)),
    includes: useStore(computed(activeCategories, createIncludesFunction)),
    toggle: action(activeCategories, 'toggle', toggleFunction),
  };
}

/**
 * Single store instance.
 */
export const filterStore = createFilterStore();
