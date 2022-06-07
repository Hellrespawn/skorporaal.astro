<script lang="ts">
  import { type FeedItem } from "@scripts/post";
  import Dot from "@components/Feed/Dot.svelte";

  export let feedItem: FeedItem;
</script>

<!-- Same px as filter -->
<a
  href={`/posts/${feedItem.title}`}
  class="button postUrl flex flex-col items-baseline md:flex-row"
>
  <span class="flex flex-grow flex-row items-baseline">
    <!-- Colored Dot -->
    <Dot type={feedItem.type} />
    <!-- Title -->
    <p class="postTitle px-2">{feedItem.title}</p>
  </span>

  <!-- Date -->
  <div
    class="postDate w-full whitespace-nowrap text-right text-sm text-gray-400 dark:text-gray-500 md:w-auto md:text-left"
  >
    {feedItem.formattedDate}
  </div>
</a>
