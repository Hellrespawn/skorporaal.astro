<script lang="ts">
  import Dot from "@components/Feed/Dot.svelte";

  export let feedItem: {
    url: string;
    dot: string;
    title: string;
    formattedDate: string;
  };
</script>

<!-- Same px as filter -->
<a
  href={feedItem.url}
  class="button postUrl flex flex-col items-baseline md:flex-row"
>
  <span class="flex flex-grow flex-row items-baseline">
    <!-- Colored Dot -->
    <Dot bg={feedItem.dot} />
    <!-- Title -->
    <p class="postTitle px-2">{feedItem.title}</p>
  </span>

  <!-- Date -->
  <div
    class="postDate w-full whitespace-nowrap text-right text-sm text-gray-400 dark:text-gray-500 md:w-auto md:text-left"
  >
    {feedItem.formattedDate}
  </div>
</a>
