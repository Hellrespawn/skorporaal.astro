<script lang="ts">
  import { type FeedItem } from "@scripts/post";
  import Filter from "@components/Filter.svelte";
  import FeedItemComponent from "@components/FeedItem.svelte";

  export let feedItems: FeedItem[];
</script>

<Filter />

<ul id="postFeed" class="text-xl md:text-base">
  {#each feedItems as feedItem}
    <li class="border-t border-gray-200 dark:border-gray-700">
      <FeedItemComponent {feedItem} />
    </li>{/each}
</ul>
