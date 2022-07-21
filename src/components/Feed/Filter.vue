<script setup lang="ts">
import Dot from '@c:Feed/Dot.vue';
import FeedButton from '@c:Feed/FeedButton.vue';

import { CategoryData, CATEGORY_DATA, PostCategory } from '@s:data';
import { filterStore } from '@s:stores/filter';
import { sortStore } from '@s:stores/sort';

const categories = <[PostCategory, CategoryData][]>(
  Object.entries(CATEGORY_DATA).filter(([_, data]) => !data.hidden)
);
</script>

<template>
  <div
    class="flex flex-row items-center justify-between border-b border-gray-200 text-lg dark:border-gray-700 md:text-base"
  >
    <div class="flex flex-row flex-wrap py-1">
      <button
        v-for="[category, data] in categories"
        type="button"
        @click="() => filterStore.toggle(category)"
        :class="{ 'opacity-50': !filterStore.includes.value(category) }"
      >
        <FeedButton class="p-2">
          <div class="flex flex-grow flex-row items-baseline">
            <!-- Colored Dot -->
            <Dot :bg="data.bg" />
            <!-- Title -->
            <p class="postTitle px-2">{{ data.plural }}</p>
          </div>
        </FeedButton>
      </button>
    </div>

    <div class="flex flex-row">
      <button
        type="button"
        @click="sortStore.cycle()"
        class="button button-medium whitespace-nowrap font-semibold"
      >
        <FeedButton class="p-2">{{ sortStore.display.value }}</FeedButton>
      </button>
    </div>
  </div>
</template>
