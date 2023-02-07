<script setup lang="ts">
import { formatTitleFromPost, Post } from '../../collection';
import { CATEGORY_DATA, PostCategory } from '../../data';
import { DateFormatter } from '../../date';

import Dot from './DotComponent.vue';
import FeedButton from './FeedButton.vue';

interface Props {
  slug: string;
  post: Post;
  category: PostCategory;
}

const props = defineProps<Props>();

const dot = CATEGORY_DATA[props.category].bg;
const title = formatTitleFromPost(props.post);

const dateFormatter = DateFormatter.getFormatter('short');
const formattedDate = dateFormatter.formatDate(props.post);
</script>

<template>
  <a :href="slug" class="flex flex-col items-baseline py-1 md:flex-row">
    <FeedButton class="w-full p-2">
      <span class="flex flex-grow flex-row items-baseline">
        <!-- Colored Dot -->
        <Dot :bg="dot" />
        <!-- Title -->
        <p class="postTitle px-2">
          {{ title }}
        </p>
      </span>

      <!-- Date -->
      <div
        class="postDate whitespace-nowrap text-right text-sm text-gray-400 dark:text-gray-500 md:w-auto md:text-left"
      >
        {{ formattedDate }}
      </div>
    </FeedButton>
  </a>
</template>
