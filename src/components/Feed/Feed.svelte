<script lang="ts">
  import { sort } from "@scripts/feed/sort";
  import { filter } from "@scripts/feed/filter";
  import { type FeedItem } from "@scripts/feed/feedItem";
  import Filter from "@components/Feed/Filter.svelte";
  import FeedItemComponent from "@components/Feed/FeedItem.svelte";

  const emptyItem = {
    url: "",
    dot: "bg-gray-500",
    title: "There are no posts.",
    formattedDate: "Someday...",
  };

  export let feedItems: FeedItem[];
  $: filteredItems = feedItems
    .filter((item) => $filter.includes(item.category))
    .sort($sort.function);
</script>

<Filter />

<ul id="postFeed" class="text-xl md:text-base">
  {#if filteredItems.length}
    {#each filteredItems as feedItem}
      <li class="border-t border-gray-200 dark:border-gray-700">
        <FeedItemComponent {feedItem} />
      </li>{/each}
  {:else}
    <li class="border-t border-gray-200 dark:border-gray-700">
      <FeedItemComponent feedItem={emptyItem} />
    </li>
  {/if}
</ul>
