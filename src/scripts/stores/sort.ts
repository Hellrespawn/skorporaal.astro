import { atom, onSet, computed, action } from "nanostores";
import { useStore } from "@nanostores/vue";

import { type FeedItem } from "@s:post";

const STORAGE_KEY = "sort";

/**
 * Describes a state for the feed sort.
 */
interface SortState {
  display: string;
  sortFunction: (left: FeedItem, right: FeedItem) => number;
}

/**
 * All valid sorting states.
 */
const STATES: SortState[] = [
  {
    display: "Date ↓",
    sortFunction: sortByDateDescending,
  },
  {
    display: "Date ↑",
    sortFunction: sortByDateAscending,
  },
  {
    display: "A-Z ↑",
    sortFunction: sortByAlphaAscending,
  },
  {
    display: "Z-A ↓",
    sortFunction: sortByAlphaDescending,
  },
];

/**
 * Callback function for Array.prototype.sort that sorts by alphabet,
 * ascending.
 */
function sortByAlphaAscending(left: FeedItem, right: FeedItem): number {
  return left.title.localeCompare(right.title);
}

/**
 * Callback function for Array.prototype.sort that sorts by alphabet,
 * descending.
 */
function sortByAlphaDescending(left: FeedItem, right: FeedItem): number {
  return -sortByAlphaAscending(left, right);
}

/**
 * Callback function for Array.prototype.sort that sorts by date,
 * ascending. Falls back to alphabet, ascending for same dates.
 */
function sortByDateAscending(left: FeedItem, right: FeedItem): number {
  let sort: number;

  if (!left.sortDate && !right.sortDate) {
    sort = sortByAlphaAscending(left, right);
  } else if (!left.sortDate) {
    sort = -1;
  } else if (!right.sortDate) {
    sort = 1;
  } else {
    sort = left.sortDate.getTime() - right.sortDate.getTime();
  }

  return sort;
}

/**
 * Callback function for Array.prototype.sort that sorts by date,
 * descending. Falls back to alphabet, ascending for same dates.
 */
function sortByDateDescending(left: FeedItem, right: FeedItem): number {
  let sort: number;

  if (!left.sortDate && !right.sortDate) {
    sort = sortByAlphaAscending(left, right);
  } else if (!left.sortDate) {
    sort = 1;
  } else if (!right.sortDate) {
    sort = -1;
  } else {
    sort = right.sortDate.getTime() - left.sortDate.getTime();
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
    display: useStore(computed(state, (state) => state.display)),
    sortFunction: useStore(computed(state, (state) => state.sortFunction)),
    cycle: action(index, "cycle", (index) => {
      index.set((index.get() + 1) % STATES.length);
    }),
  };
}

/**
 * Single store instance.
 */
export const sortStore = createSortStore();
