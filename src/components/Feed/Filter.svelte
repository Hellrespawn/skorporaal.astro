<script lang="ts">
  import { CATEGORY_DATA } from "@scripts/data";
  import { sortState } from "@scripts/feed/sort";
  import Dot from "@components/Feed/Dot.svelte";
</script>

<div class="flex flex-row items-center text-lg md:text-base">
  {#each Object.values(CATEGORY_DATA) as data}
    <button class="button gap-x-2">
      <Dot bg={data.bg} />
      {data.plural}
    </button>
  {/each}

  <div class="flex-grow" />

  <button
    on:click={sortState.cycle}
    class="button button-medium whitespace-nowrap font-semibold"
    >{$sortState.display}</button
  >
</div>
