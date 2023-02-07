<script setup lang="ts">
import { type PostCategory, POST_CATEGORIES, CATEGORY_DATA } from '../../data';
import { filterStore } from '../../stores/filter';
import { sortStore } from '../../stores/sort';
import Dot from '../DotComponent.vue';
import FeedButton from './FeedButton.vue';

const categories: PostCategory[] = POST_CATEGORIES.filter(
  (category: PostCategory) => !CATEGORY_DATA[category].hidden
);
</script>

<template>
  <div
    class="flex flex-row items-center justify-between border-b border-gray-200 text-lg dark:border-gray-700 md:text-base"
  >
    <div class="flex flex-row flex-wrap py-1">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        :class="{ 'opacity-50': !filterStore.includes.value(category) }"
        @click="() => filterStore.toggle(category)"
      >
        <FeedButton class="p-2">
          <div class="flex flex-grow flex-row items-baseline">
            <!-- Colored Dot -->
            <Dot :bg="CATEGORY_DATA[category].bg" />
            <!-- Title -->
            <p class="postTitle px-2">{{ CATEGORY_DATA[category].plural }}</p>
          </div>
        </FeedButton>
      </button>
    </div>

    <div class="flex flex-row">
      <button
        type="button"
        class="button button-medium whitespace-nowrap font-semibold"
        @click="sortStore.cycle()"
      >
        <FeedButton class="p-2">{{ sortStore.display.value }}</FeedButton>
      </button>
    </div>
  </div>
</template>
