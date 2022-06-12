<script lang="ts">
  import Dot from "@components/Feed/Dot.svelte";
  import FeedButton from "@components/Feed/FeedButton.svelte";
  import { CATEGORY_DATA } from "@scripts/data";
  import { sort } from "@scripts/feed/sort";
  import { filter } from "@scripts/feed/filter";
</script>

<div
  class="flex flex-row items-center justify-between border-b border-gray-200 text-lg dark:border-gray-700 md:text-base"
>
  <div class="flex flex-row flex-wrap py-1">
    {#each Object.entries(CATEGORY_DATA) as [category, data]}
      <button
        on:click={() => filter.toggle(category)}
        class:opacity-50={!$filter.includes(category)}
      >
        <FeedButton class="p-2">
          <div class="flex flex-grow flex-row items-baseline">
            <!-- Colored Dot -->
            <Dot bg={data.bg} />
            <!-- Title -->
            <p class="postTitle px-2">{data.plural}</p>
          </div>
        </FeedButton>
      </button>
    {/each}
  </div>

  <div class="flex flex-row">
    <button
      on:click={sort.cycle}
      class="button button-medium whitespace-nowrap font-semibold"
    >
      <FeedButton class="p-2">{$sort.display}</FeedButton></button
    >
  </div>
</div>
