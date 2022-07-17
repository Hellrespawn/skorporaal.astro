import { atom, onSet, computed, action } from "nanostores";
import { useStore } from "@nanostores/vue";

import { type FeedItem } from "@s:post";

interface SortState {
  sortFunction: (left: FeedItem, right: FeedItem) => number;
  display: string;
}

const STATES: SortState[] = [
  {
    sortFunction: sortByDateDescending,
    display: "Date ↓",
  },
  {
    sortFunction: sortByDateAscending,
    display: "Date ↑",
  },
  {
    sortFunction: sortByAlphaAscending,
    display: "A-Z ↑",
  },
  {
    sortFunction: sortByAlphaDescending,
    display: "Z-A ↓",
  },
];

const STORAGE_KEY = "sort";

function sortByAlphaAscending(left: FeedItem, right: FeedItem): number {
  return left.title.localeCompare(right.title);
}

function sortByAlphaDescending(left: FeedItem, right: FeedItem): number {
  return -sortByAlphaAscending(left, right);
}

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

function isValidIndex(index: number): boolean {
  if (isNaN(index) || index < 0 || index >= STATES.length) {
    return false;
  }

  return true;
}

function loadSortIndex(): number {
  let index = 0;

  const storedIndex = localStorage.getItem(STORAGE_KEY);

  if (storedIndex) {
    const parsedIndex = parseInt(storedIndex);

    if (isValidIndex(parsedIndex)) {
      index = parsedIndex;
    } else {
      console.error(`Invalid sort index: ${storedIndex}`);
    }
  }

  return index;
}

function saveSortIndex(index: number): void {
  localStorage.setItem(STORAGE_KEY, index.toString());
}

function createSortStore() {
  const index = atom(loadSortIndex());

  onSet(index, ({ newValue }) => {
    saveSortIndex(newValue);
  });

  // Computed Refs
  const state = computed(index, (index) => STATES[index]);

  const display = computed(state, (state) => state.display);

  const sortFunction = computed(state, (state) => state.sortFunction);

  const cycle = action(index, "cycle", (index) => {
    index.set((index.get() + 1) % STATES.length);
  });

  return {
    display: useStore(display),
    sortFunction: useStore(sortFunction),
    cycle,
  };
}

export const sortStore = createSortStore();
