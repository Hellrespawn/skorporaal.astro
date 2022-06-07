<script lang="ts">
  import { CategoryData, CATEGORY_DATA, type PostType } from "@scripts/post";
  import Dot from "@components/Feed/Dot.svelte";

  const categoryData = <[PostType, CategoryData][]>(
    Object.entries(CATEGORY_DATA).sort(([left, _l], [right, _r]) =>
      left.localeCompare(right)
    )
  );
</script>

<div class="flex flex-row items-center text-lg md:text-base">
  {#each categoryData as [type, data]}
    <button id={type + "FilterButton"} class="button gap-x-2">
      <Dot {type} />
      {data.plural}
    </button>
  {/each}

  <div class="flex-grow" />

  <button
    id="sortButton"
    class="button button-medium whitespace-nowrap font-semibold"
  />
</div>
