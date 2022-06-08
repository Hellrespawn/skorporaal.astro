<script lang="ts">
  import { CATEGORY_DATA } from "@scripts/data";
  import { sort } from "@scripts/feed/sort";
  import { filter } from "@scripts/feed/filter";
  import Dot from "@components/Feed/Dot.svelte";
</script>

<div class="flex flex-row items-center justify-between text-lg md:text-base">
  <div class="flex flex-col md:flex-row">
    {#each Object.entries(CATEGORY_DATA) as [category, data]}
      <button
        class="button gap-x-2"
        on:click={() => filter.toggle(category)}
        class:opacity-50={!$filter.includes(category)}
      >
        <Dot bg={data.bg} />
        {data.plural}
      </button>
    {/each}
  </div>

  <div class="flex flex-row">
    <button
      on:click={sort.cycle}
      class="button button-medium whitespace-nowrap font-semibold"
      >{$sort.display}</button
    >
  </div>
</div>
