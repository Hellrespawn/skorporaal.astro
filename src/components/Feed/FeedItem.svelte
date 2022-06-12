<script lang="ts">
  import { onMount } from "svelte";
  import Dot from "@components/Feed/Dot.svelte";
  import FeedButton from "@components/Feed/FeedButton.svelte";
  import { LANGUAGE_DATA } from "@scripts/data";

  export let feedItem: {
    dot: string;
    formattedDate: string;
    lang: string;
    title: string;
    url: string;
  };

  let title = feedItem.title;

  onMount(() => {
    if (feedItem.lang !== document.documentElement.lang) {
      title += ` [${
        LANGUAGE_DATA[document.documentElement.lang][feedItem.lang]
      }]`;
    }
  });
</script>

<a href={feedItem.url} class="flex flex-col items-baseline p-1 md:flex-row">
  <FeedButton class="w-full px-2 py-2">
    <span class="flex flex-row items-baseline flex-grow">
      <!-- Colored Dot -->
      <Dot bg={feedItem.dot} />
      <!-- Title -->
      <p class="px-2 postTitle">{title}</p>
    </span>

    <!-- Date -->
    <div
      class="w-full text-sm text-right text-gray-400 postDate whitespace-nowrap dark:text-gray-500 md:w-auto md:text-left"
    >
      {feedItem.formattedDate}
    </div>
  </FeedButton>
</a>
