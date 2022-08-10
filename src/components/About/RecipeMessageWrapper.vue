<script setup lang="ts">
import { computed } from 'vue';
import { filterStore } from '../../scripts/stores/filter';

const showRecipeMessage = computed(() => filterStore.includes.value('recipe'));
</script>

<template>
  <slot />
  <template v-if="showRecipeMessage">
    Also, I needed somewhere to store my recipes.</template
  >
</template>
