<script lang="ts">
  import { CATEGORY_DATA, type PostType } from "@scripts/post";

  export let type: PostType;

  const bg = CATEGORY_DATA[type].bg;
</script>

<span class={`${bg} inline-block h-2 w-2 shrink-0 rounded-full`} />
