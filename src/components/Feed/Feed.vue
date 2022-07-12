<script setup lang="ts">
import { MarkdownInstance } from "astro";
import { computed } from "vue";

import { type Frontmatter } from "@s:post";
import { FeedItem } from "@s:feed/feedItem";
import { filterStore } from "@s:feed/filter.vue";
import { sortStore } from "@s:feed/sort.vue";

import FeedItemComponent from "@c:Feed/FeedItem.vue";
import Filter from "@c:Feed/Filter.vue";

const emptyItem = {
  dot: "bg-gray-500",
  getFormattedDate() {
    return "Someday...";
  },
  get lang() {
    return document.documentElement.lang;
  },
  title: "There are no posts.",
  url: "",
} as unknown as FeedItem;

const { instances } = defineProps<{
  instances: MarkdownInstance<Frontmatter>[];
}>();

const filteredItems = computed(() =>
  instances
    .map((instance) => new FeedItem(instance))
    .filter((item) => filterStore.includes(item.category))
    .sort(sortStore.callback)
);
</script>

<template>
  <Filter />

  <ul id="postFeed" class="text-xl md:text-base">
    <li
      v-for="feedItem in filteredItems"
      :key="feedItem.slug"
      class="border-b border-gray-200 dark:border-gray-700"
    >
      <FeedItemComponent :feedItem="feedItem" />
    </li>

    <li
      v-if="!filteredItems.length"
      class="border-b border-gray-200 dark:border-gray-700"
    >
      <FeedItemComponent :feedItem="emptyItem" />
    </li>
  </ul>
</template>
