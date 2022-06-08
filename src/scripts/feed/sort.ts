import { writable } from "svelte/store";
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

  if (!left.date && !right.date) {
    sort = sortByAlphaAscending(left, right);
  } else if (!left.date) {
    sort = -1;
  } else if (!right.date) {
    sort = 1;
  } else {
    sort = left.date.getTime() - right.date.getTime();
  }

  return sort;
}

function sortByDateDescending(left: FeedItem, right: FeedItem): number {
  let sort: number;

  if (!left.date && !right.date) {
    sort = sortByAlphaAscending(left, right);
  } else if (!left.date) {
    sort = 1;
  } else if (!right.date) {
    sort = -1;
  } else {
    sort = right.date.getTime() - left.date.getTime();
  }

  return sort;
}

function createState() {
  let index = 0;

  const { subscribe, set } = writable(STATES[index]);

  return {
    subscribe,
    cycle: (): void => {
      index = (index + 1) % STATES.length;
      set(STATES[index]);
    },
  };
}

export const sortState = createState();
