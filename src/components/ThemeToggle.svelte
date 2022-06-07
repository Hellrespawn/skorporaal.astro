<script lang="ts">
  import { onMount } from "svelte";

  import * as ThemeModel from "@scripts/model/theme.model";
  import Sun from "./Icons/Sun.svelte";
  import Moon from "./Icons/Moon.svelte";

  onMount(ThemeModel.init);

  function toggle(): void {
    ThemeModel.toggle();
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
