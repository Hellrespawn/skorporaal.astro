<script setup lang="ts">
const { bg, size } = defineProps({
  bg: { type: String, required: true },
  size: { type: String, default: "h-2 w-2" },
});
</script>

<template>
  <span :class="`${bg} ${size} inline-block shrink-0 rounded-full`" />
</template>
