<script lang="ts">
  export let classes: string = "";
  export let size: "small" | "medium" | "large" = "medium";
  switch (size) {
    case "small":
      classes += " h-10 w-10";
      break;
    case "medium":
      classes += " h-12 w-12";
      break;
    case "large":
      classes += " h-16 w-16";
      break;
    default:
      throw new Error(`Invalid icon size '${size}'`);
  }
</script>

<span
  class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 p-2 text-gray-50 dark:bg-gray-200 dark:text-gray-800 {classes}"
>
  <slot />
</span>
