<script lang="ts">
  import { onMount } from "svelte";

  import Icon from "./Icon.svelte";
  import * as ThemeModel from "@scripts/model/theme.model";

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
    <Icon classes="theme-shadow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <title>Light Mode Icon</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </Icon>
  </span>
  <span class="dark:hidden" on:click={toggle}>
    <Icon classes="theme-shadow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <title>Dark Mode Icon</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </Icon>
  </span>
</button>
