import { atom, onSet, computed, action } from 'nanostores';
import { useStore } from '@nanostores/vue';
import type { Post } from '../collection';

const STORAGE_KEY = 'sort';

/**
 * Describes a state for the feed sort.
 */
interface SortState {
  display: string;
  sortFunction: (left: Post, right: Post) => number;
}

/**
 * All valid sorting states.
 */
const STATES: SortState[] = [
  {
    display: 'Date ↓',
    sortFunction: sortByDateDescending,
  },
  {
    display: 'Date ↑',
    sortFunction: sortByDateAscending,
  },
  {
    display: 'A-Z ↑',
    sortFunction: sortByAlphaAscending,
  },
  {
    display: 'Z-A ↓',
    sortFunction: sortByAlphaDescending,
  },
];

function getSortingDates(
  left: Post,
  right: Post
): [Date | undefined, Date | undefined] {
  return [left.updated ?? left.date, right.updated ?? right.date];
}

/**
 * Callback function for Array.prototype.sort that sorts by alphabet,
 * ascending.
 */
function sortByAlphaAscending(left: Post, right: Post): number {
  return left.title.localeCompare(right.title);
}

/**
 * Callback function for Array.prototype.sort that sorts by alphabet,
 * descending.
 */
function sortByAlphaDescending(left: Post, right: Post): number {
  return -sortByAlphaAscending(left, right);
}

/**
 * Callback function for Array.prototype.sort that sorts by date,
 * ascending. Falls back to alphabet, ascending for same dates.
 */
function sortByDateAscending(left: Post, right: Post): number {
  let sort: number;

  const [leftDate, rightDate] = getSortingDates(left, right);

  if (!leftDate && !rightDate) {
    sort = sortByAlphaAscending(left, right);
  } else if (!leftDate) {
    sort = -1;
  } else if (!rightDate) {
    sort = 1;
  } else {
    sort = leftDate.getTime() - rightDate.getTime();
  }

  return sort;
}

/**
 * Callback function for Array.prototype.sort that sorts by date,
 * descending. Falls back to alphabet, ascending for same dates.
 */
function sortByDateDescending(left: Post, right: Post): number {
  let sort: number;

  const [leftDate, rightDate] = getSortingDates(left, right);

  if (!leftDate && !rightDate) {
    sort = sortByAlphaAscending(left, right);
  } else if (!leftDate) {
    sort = 1;
  } else if (!rightDate) {
    sort = -1;
  } else {
    sort = rightDate.getTime() - leftDate.getTime();
  }

  return sort;
}

/**
 * Validates stored index.
 */
function isValidStoredIndex(storedIndex: number): boolean {
  if (isNaN(storedIndex) || storedIndex < 0 || storedIndex >= STATES.length) {
    return false;
  }

  return true;
}

/**
 * Attempts to load state index from localStorage.
 */
function loadSortIndex(): number {
  let index = 0;

  const storedIndex = localStorage.getItem(STORAGE_KEY);

  if (storedIndex) {
    const parsedIndex = parseInt(storedIndex);

    if (isValidStoredIndex(parsedIndex)) {
      index = parsedIndex;
    } else {
      console.error(`Invalid sort index: ${storedIndex}`);
    }
  }

  return index;
}

/**
 * Saves state index to localStorage.
 */
function saveSortIndex(index: number): void {
  localStorage.setItem(STORAGE_KEY, index.toString());
}

/**
 * Create instance of sortStore.
 */
function createSortStore() {
  const index = atom(loadSortIndex());

  onSet(index, ({ newValue }) => {
    saveSortIndex(newValue);
  });

  const state = computed(index, (index) => STATES[index]);

  return {
    display: useStore(computed(state, (state) => state!.display)),
    sortFunction: useStore(computed(state, (state) => state!.sortFunction)),
    cycle: action(index, 'cycle', (index) => {
      index.set((index.get() + 1) % STATES.length);
    }),
  };
}

/**
 * Single store instance.
 */
export const sortStore = createSortStore();
