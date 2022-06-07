<script lang="ts">
  import {
    CategoryData,
    CATEGORY_DATA,
    type PostCategory,
  } from "@scripts/post";
  import Dot from "@components/Feed/Dot.svelte";
</script>

<div class="flex flex-row items-center text-lg md:text-base">
  {#each Object.entries(CATEGORY_DATA) as [category, data]}
    <button class="button gap-x-2">
      <Dot {category} />
      {data.plural}
    </button>
  {/each}

  <div class="flex-grow" />

  <button class="button button-medium whitespace-nowrap font-semibold" />
</div>
