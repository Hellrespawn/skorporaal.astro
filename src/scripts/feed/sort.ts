import { ref, computed } from "vue";

import { type FeedItem } from "./feedItem";

interface SortState {
  display: string;
  function: (left: FeedItem, right: FeedItem) => number;
}

const STATES: SortState[] = [
  {
    display: "Date ↓",
    function: sortByDateDescending,
  },
  {
    display: "Date ↑",
    function: sortByDateAscending,
  },
  {
    display: "A-Z ↑",
    function: sortByAlphaAscending,
  },
  {
    display: "Z-A ↓",
    function: sortByAlphaDescending,
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

function createSortStore() {
  const index = ref(0);
  const state = computed(() => STATES[index.value]);

  return {
    state,
    cycle(): void {
      index.value = (index.value + 1) % STATES.length;
    },
  };
}

export const sortStore = createSortStore();
