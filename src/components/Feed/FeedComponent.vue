<script setup lang="ts">
import { computed } from 'vue';
import type { EntryWithCategory } from '../../collection';
import { FeedItem } from '../../scripts/post';
import { filterStore } from '../../stores/filter';
import { sortStore } from '../../stores/sort';
import FeedItemComponent from './FeedItem.vue';

const props = defineProps<{
  entriesWithCategory: EntryWithCategory[];
}>();

const feedItems = computed(() =>
  props.entriesWithCategory.map((instance) => new FeedItem(instance))
);

const filteredItems = computed(() =>
  feedItems.value
    .filter(filterStore.filterFunction.value)
    .sort(sortStore.sortFunction.value)
);
</script>

<template>
  <ul v-if="filteredItems.length" id="postFeed" class="text-xl md:text-base">
    <li
      v-for="feedItem in filteredItems"
      :key="feedItem.slug"
      class="border-b border-gray-200 dark:border-gray-700"
    >
      <FeedItemComponent :feed-item="feedItem" />
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
