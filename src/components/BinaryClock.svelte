<script lang="ts">
  import { onMount } from "svelte";

  import Dot from "@c:Dot.svelte";

  export let bg: string | undefined;
  const finalBg = bg ?? "bg-secondary-500 dark:bg-primary-500";

  const size = "h-2 w-2";

  type Bits = string;

  let now = new Date();

  $: hours = numberToBits(now.getHours(), 5);
  $: minutes = numberToBits(now.getMinutes(), 6);
  $: seconds = numberToBits(now.getSeconds(), 6);

  onMount(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  function leadingZeros(string: string, length: number): string {
    if (string.length > length) {
      throw new Error("String longer than desired length!");
    }
    return ("0".repeat(length) + string).slice(-length);
  }

  function numberToBits(number: number, expectedBits: number): Bits {
    return leadingZeros(number.toString(2), expectedBits);
  }
</script>

<div class="flex flex-col">
  {#each [hours, minutes, seconds] as bits, i}
    <div class="flex flex-row justify-end">
      {#each bits as bit, j}
        {#if !i && !j}
          <span
            class={`${size} flex justify-center items-center text-xs text-gray-600 dark:text-gray-300`}
          >
            ※
          </span>
        {/if}
        <Dot bg={+bit ? finalBg : "bg-gray-200 dark:bg-gray-800"} {size} />
      {/each}
    </div>
  {/each}
</div>
