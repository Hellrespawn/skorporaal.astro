<script setup lang="ts">
const props = defineProps<{ bg: string; size?: string }>();

const bg = props.bg;
const size = props.size ?? "h-2 w-2";
</script>

<template>
  <span :class="`${bg} ${size} inline-block shrink-0 rounded-full`" />
</template>
