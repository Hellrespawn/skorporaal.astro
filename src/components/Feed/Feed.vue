<script setup lang="ts">
import { computed } from "vue";

import { FeedItem } from "@s:feed/feedItem";
import { filterStore } from "@s:feed/filter";
import { sortStore } from "@s:feed/sort";

import FeedItemComponent from "@c:Feed/FeedItem.vue";
import Filter from "@c:Feed/Filter.vue";
import { MarkdownInstance } from "astro";
import { Frontmatter } from "../../scripts/post";

const emptyItem = {
  dot: "bg-gray-500",
  formattedDate: "Someday...",
  get lang() {
    return document.documentElement.lang;
  },
  title: "There are no posts.",
  url: "",
} as FeedItem;

const { instances } = defineProps<{
  instances: MarkdownInstance<Frontmatter>[];
}>();

const filteredItems = computed(() =>
  instances
    .map((instance) => new FeedItem(instance))
    .filter((item) => filterStore.includes(item.category))
    .sort(sortStore.state.value.function)
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
      v-if="emptyItem && filteredItems.length === 0"
      class="border-b border-gray-200 dark:border-gray-700"
    >
      <FeedItemComponent :feedItem="emptyItem" />
    </li>
  </ul>
</template>
