<script lang="ts">
  import { onMount } from "svelte";

  import { type FeedItem } from "@s:feed/feedItem";
  import { filter } from "@s:feed/filter";
  import { sort } from "@s:feed/sort";

  import FeedItemComponent from "@c:Feed/FeedItem.svelte";
  import Filter from "@c:Feed/Filter.svelte";

  let emptyItem: FeedItem;

  onMount(() => {
    emptyItem = {
      dot: "bg-gray-500",
      formattedDate: "Someday...",
      lang: document.documentElement.lang,
      title: "There are no posts.",
      url: "",
    } as FeedItem;
  });

  export let feedItems: FeedItem[];
  $: filteredItems = feedItems
    .filter((item) => $filter.includes(item.category))
    .sort($sort.function);
</script>

<Filter />

<ul id="postFeed" class="text-xl md:text-base">
  {#if filteredItems.length}
    {#each filteredItems as feedItem (feedItem.slug)}
      <li class="border-b border-gray-200 dark:border-gray-700">
        <FeedItemComponent {feedItem} />
      </li>{/each}
  {:else}
    <li class="border-b border-gray-200 dark:border-gray-700">
      <FeedItemComponent feedItem={emptyItem} />
    </li>
  {/if}
</ul>
