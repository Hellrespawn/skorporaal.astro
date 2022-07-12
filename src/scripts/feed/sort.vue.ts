import { ref, computed, reactive } from "vue";

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

export function createSortStore() {
  // Ref
  const index = ref(0);

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
