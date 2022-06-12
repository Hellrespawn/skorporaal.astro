<script lang="ts">
  import Dot from "@components/Feed/Dot.svelte";
  import FeedButton from "@components/Feed/FeedButton.svelte";
  import { CATEGORY_DATA } from "@scripts/data";
  import { sort } from "@scripts/feed/sort";
  import { filter } from "@scripts/feed/filter";
</script>

<div
  class="flex flex-row items-center justify-between text-lg border-b border-gray-200 md:text-base dark:border-gray-700"
>
  <div class="flex flex-row flex-wrap py-1">
    {#each Object.entries(CATEGORY_DATA) as [category, data]}
      <button
        on:click={() => filter.toggle(category)}
        class:opacity-50={!$filter.includes(category)}
      >
        <FeedButton class="px-2 py-2">
          <div class="flex flex-row items-baseline flex-grow">
            <!-- Colored Dot -->
            <Dot bg={data.bg} />
            <!-- Title -->
            <p class="px-2 postTitle">{data.plural}</p>
          </div>
        </FeedButton>
      </button>
    {/each}
  </div>

  <div class="flex flex-row">
    <button
      on:click={sort.cycle}
      class="font-semibold button button-medium whitespace-nowrap"
    >
      <FeedButton class="px-2 py-2">{$sort.display}</FeedButton></button
    >
  </div>
</div>
