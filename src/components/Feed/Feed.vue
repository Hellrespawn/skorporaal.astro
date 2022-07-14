<script setup lang="ts">
import { MarkdownInstance } from "astro";
import { computed } from "vue";

import { type Frontmatter } from "@s:post";
import { FeedItem } from "@s:feed/feedItem";
import { filterStore } from "@s:feed/filter.vue";
import { sortStore } from "@s:feed/sort.vue";

import FeedItemComponent from "@c:Feed/FeedItem.vue";
import Filter from "@c:Feed/Filter.vue";

const { instances } = defineProps<{
  instances: MarkdownInstance<Frontmatter>[];
}>();

const feedItems = instances.map((instance) => new FeedItem(instance));

const filteredItems = computed(() =>
  feedItems
    .filter((item) => filterStore.includes(item.category))
    .sort(sortStore.callback)
);
</script>

<template>
  <Filter />

  <ul v-if="filteredItems.length" id="postFeed" class="text-xl md:text-base">
    <li
      v-for="feedItem in filteredItems"
      :key="feedItem.slug"
      class="border-b border-gray-200 dark:border-gray-700"
    >
      <FeedItemComponent :feedItem="feedItem" />
    </li>
  </ul>

  <div
    v-else
    class="my-4 flex flex-col items-center justify-end text-gray-400 dark:text-gray-500 md:mb-0 md:mt-16"
  >
    <figure>
      <blockquote class="mb-4 text-lg italic">
        <p>Nothing beside remains. Round the decay</p>
        <p>Of that colossal Wreck, boundless and bare</p>
        <p>The lone and level sands stretch far away.</p>
        <cite></cite>
      </blockquote>
      <figcaption class="text-xs">
        <a
          href="https://www.poetryfoundation.org/poems/46565/ozymandias"
          target="_blank"
          rel="nofollow noopener noreferrer"
          class="fancy-link italic"
          >Ozymandias</a
        >&mdash; Percy Bysshe Shelley
      </figcaption>
    </figure>
  </div>
</template>
