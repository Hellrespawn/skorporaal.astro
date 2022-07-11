<script setup lang="ts">
import Dot from "@c:Dot.vue";
import FeedButton from "@c:Feed/FeedButton.vue";

import { CATEGORY_DATA } from "@s:data";
import { filterStore } from "@s:feed/filter.vue";
import { sortStore } from "@s:feed/sort.vue";
</script>

<template>
  <div
    class="flex flex-row items-center justify-between border-b border-gray-200 text-lg dark:border-gray-700 md:text-base"
  >
    <div class="flex flex-row flex-wrap py-1">
      <button
        v-for="[category, data] in Object.entries(CATEGORY_DATA)"
        type="button"
        @click="() => filterStore.toggle(category)"
        :class="{ 'opacity-50': !filterStore.includes(category) }"
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
        <FeedButton class="p-2">{{ sortStore.state.value.display }}</FeedButton>
      </button>
    </div>
  </div>
</template>
