<script setup lang="ts">
import type { CollectionEntry } from 'astro:content';
import { computed } from 'vue';
import { filterStore } from '../../stores/filter';
import { sortStore } from '../../stores/sort';
import FeedItemComponent from './FeedItem.vue';
import { getCategoryFromEntry } from '../../collection';

const props = defineProps<{
  entries: CollectionEntry<'post'>[];
}>();

const filteredEntries = computed(() =>
  props.entries
    .filter((entry) => filterStore.filterFunction.value(entry))
    .sort((left, right) => sortStore.sortFunction.value(left.data, right.data))
);
</script>

<template>
  <ul v-if="filteredEntries.length" id="postFeed" class="text-xl md:text-base">
    <li
      v-for="entry in filteredEntries"
      :key="entry.id"
      class="border-b border-gray-200 dark:border-gray-700"
    >
      <FeedItemComponent
        :slug="entry.slug"
        :post="entry.data"
        :category="getCategoryFromEntry(entry)"
      />
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
