<script lang="ts">
  import { sortState } from "@scripts/feed/sort";
  import { type FeedItem } from "@scripts/feed/feedItem";
  import Filter from "@components/Feed/Filter.svelte";
  import FeedItemComponent from "@components/Feed/FeedItem.svelte";

  export let feedItems: FeedItem[];
</script>

<Filter />

<ul id="postFeed" class="text-xl md:text-base">
  {#each feedItems.sort($sortState.function) as feedItem}
    <li class="border-t border-gray-200 dark:border-gray-700">
      <FeedItemComponent {feedItem} />
    </li>{/each}
</ul>
