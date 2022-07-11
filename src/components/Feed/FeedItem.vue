<script lang="ts">
import { LANGUAGE_DATA } from "@s:data";
import { FeedItem } from "@s:feed/feedItem";

import Dot from "@c:Dot.svelte";
import FeedButton from "@c:Feed/FeedButton.svelte";

export default {
  components: {
    Dot,
    FeedButton,
  },
  props: {
    feedItem: FeedItem,
  },
  mounted() {
    if (this.feedItem.lang !== document.documentElement.lang) {
      this.title += ` [${
        LANGUAGE_DATA[document.documentElement.lang][this.feedItem.lang]
      }]`;
    }
  },
  data() {
    return {
      title: this.feedItem.title,
    };
  },
};
</script>

<template>
  <a href="{feedItem.url}" class="flex flex-col items-baseline p-1 md:flex-row">
    <FeedButton class="w-full p-2">
      <span class="flex flex-grow flex-row items-baseline">
        <!-- Colored Dot -->
        <Dot bg="{feedItem.dot}" />
        <!-- Title -->
        <p class="postTitle px-2">{{ title }}</p>
      </span>

      <!-- Date -->
      <div
        class="postDate whitespace-nowrap text-right text-sm text-gray-400 dark:text-gray-500 md:w-auto md:text-left"
      >
        {{ feedItem.formattedDate }}
      </div>
    </FeedButton>
  </a>
</template>
