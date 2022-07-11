<script setup lang="ts">
const props = defineProps<{ class?: string }>();

const classes = props.class ?? "";
</script>

<template>
  <div
    :class="`${classes} flex flex-row items-baseline rounded-sm text-gray-700 transition-[background-color] duration-main hover:bg-gray-100 active:bg-gray-200 dark:text-gray-200 hover:dark:bg-gray-750 active:dark:bg-gray-700`"
  >
    <slot />
  </div>
</template>
