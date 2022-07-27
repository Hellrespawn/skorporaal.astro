<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ bg: string; size?: string }>();

const size = computed(() => props.size ?? 'h-2 w-2');
</script>

<template>
  <span :class="`${props.bg} ${size} inline-block shrink-0 rounded-full`" />
</template>
