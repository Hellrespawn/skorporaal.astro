import { ref, computed, reactive, watch } from "vue";

import { type FeedItem } from "./feedItem";

interface SortState {
  callback: (left: FeedItem, right: FeedItem) => number;
  display: string;
}

const STATES: SortState[] = [
  {
    callback: sortByDateDescending,
    display: "Date ↓",
  },
  {
    callback: sortByDateAscending,
    display: "Date ↑",
  },
  {
    callback: sortByAlphaAscending,
    display: "A-Z ↑",
  },
  {
    callback: sortByAlphaDescending,
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
  // Ref
  const index = ref(loadSortIndex());

  watch(index, saveSortIndex);

  // Computed Refs
  const state = computed(() => STATES[index.value]);

  const callback = computed(() => state.value.callback);

  const display = computed(() => state.value.display);

  return reactive({
    callback,
    display,
    cycle(): void {
      index.value = (index.value + 1) % STATES.length;
    },
  });
}

export const sortStore = createSortStore();
