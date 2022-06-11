<script lang="ts">
  import Dot from "@components/Feed/Dot.svelte";
  import { onMount } from "svelte";
  import { LANGUAGE_DATA } from "../../scripts/data";
  import FeedButton from "./FeedButton.svelte";

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

<FeedButton>
  <!-- Same px as filter -->
  <a
    href={feedItem.url}
    class="flex flex-col items-baseline w-full postUrl md:flex-row"
  >
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
  </a>
</FeedButton>
