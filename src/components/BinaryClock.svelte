<script lang="ts">
  import { onMount } from "svelte";

  import Dot from "@c:Dot.svelte";

  export let bg: string | undefined;
  const finalBg = bg ?? "bg-secondary-500 dark:bg-primary-500";

  const size = "h-2 w-2";

  type Bits = string;

  let now = new Date();

  $: hours = now.getHours();
  $: minutes = now.getMinutes();
  $: seconds = now.getSeconds();

  $: hourBits = numberToBits(hours, 6);
  $: minuteBits = numberToBits(minutes, 6);
  $: secondBits = numberToBits(seconds, 6);

  $: time = [
    {
      name: "hours",
      value: leadingZeros(hours.toString(), 2),
      bits: hourBits,
    },
    {
      name: "minutes",
      value: leadingZeros(minutes.toString(), 2),
      bits: minuteBits,
    },
    {
      name: "seconds",
      value: leadingZeros(seconds.toString(), 2),
      bits: secondBits,
    },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  function leadingZeros(string: string, length: number): string {
    return ("0".repeat(length) + string).slice(-length);
  }

  function numberToBits(number: number, expectedBits: number): Bits {
    return leadingZeros(number.toString(2), expectedBits);
  }
</script>

<div class="flex flex-col font-mono text-[10px]">
  {#each time as { value, bits }}
    <div class="flex flex-row">
      {#each bits as bit}
        <Dot bg={+bit ? finalBg : "bg-gray-200 dark:bg-gray-800"} {size} />
      {/each}
    </div>
  {/each}
</div>
