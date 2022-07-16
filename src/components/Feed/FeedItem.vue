<script setup lang="ts">
import Dot from "@c:Feed/Dot.vue";
import FeedButton from "@c:Feed/FeedButton.vue";

import { type FeedItem } from "@s:feed/feedItem";

const { feedItem } = defineProps<{ feedItem: FeedItem }>();
</script>

<template>
  <a :href="feedItem.url" class="flex flex-col items-baseline py-1 md:flex-row">
    <FeedButton class="w-full p-2">
      <span class="flex flex-grow flex-row items-baseline">
        <!-- Colored Dot -->
        <Dot :bg="feedItem.dot" />
        <!-- Title -->
        <p class="postTitle px-2">
          {{ feedItem.getFormattedTitle() }}
        </p>
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
