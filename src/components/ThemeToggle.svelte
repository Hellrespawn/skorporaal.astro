<script lang="ts">
  import { onMount } from "svelte";

  import { initTheme, toggleTheme } from "@scripts/theme";
  import Sun from "./Icons/Sun.svelte";
  import Moon from "./Icons/Moon.svelte";

  onMount(initTheme);

  function toggle(): void {
    toggleTheme();
  }
</script>

<button
  tabindex="0"
  class="static bottom-8 left-4 cursor-pointer rounded-full md:fixed md:bottom-4"
  aria-label="toggle theme"
>
  <span class="hidden dark:inline" on:click={toggle}>
    <Sun />
  </span>
  <span class="dark:hidden" on:click={toggle}>
    <Moon />
  </span>
</button>
