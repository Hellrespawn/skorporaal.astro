<script lang="ts">
  let classes: string = "";
  export { classes as class };
</script>

<div
  class="flex flex-row items-baseline rounded-sm text-gray-700 transition-colors duration-main hover:bg-gray-100 active:bg-gray-200 dark:text-gray-200 hover:dark:bg-gray-750 active:dark:bg-gray-700 {classes}"
>
  <slot />
</div>
