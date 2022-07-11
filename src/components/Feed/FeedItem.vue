<script setup lang="ts">
import { onMounted } from "vue";

import Dot from "@c:Dot.vue";
import FeedButton from "@c:Feed/FeedButton.vue";

import { LANGUAGE_DATA } from "@s:data";
import { type FeedItem } from "@s:feed/feedItem";

const { feedItem } = defineProps<{ feedItem: FeedItem }>();

let title = feedItem.title;

onMounted(() => {
  if (feedItem.lang !== document.documentElement.lang) {
    title += ` [${
      LANGUAGE_DATA[document.documentElement.lang][feedItem.lang]
    }]`;
  }
});
</script>

<template>
  <a :href="feedItem.url" class="flex flex-col items-baseline p-1 md:flex-row">
    <FeedButton class="w-full p-2">
      <span class="flex flex-grow flex-row items-baseline">
        <!-- Colored Dot -->
        <Dot :bg="feedItem.dot" />
        <!-- Title -->
        <p class="postTitle px-2">{{ title }}</p>
      </span>

      <!-- Date -->
      <div
        class="postDate whitespace-nowrap text-right text-sm text-gray-400 dark:text-gray-500 md:w-auto md:text-left"
      >
        {{ feedItem.getFormattedDate("short") }}
      </div>
    </FeedButton>
  </a>
</template>
