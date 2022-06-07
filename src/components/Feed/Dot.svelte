<script lang="ts">
  import { CATEGORY_DATA, type PostCategory } from "@scripts/post";

  export let category: PostCategory;

  const bg = CATEGORY_DATA[category].bg;
</script>

<span class={`${bg} inline-block h-2 w-2 shrink-0 rounded-full`} />
