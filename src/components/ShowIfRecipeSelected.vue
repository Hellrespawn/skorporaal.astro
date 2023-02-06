<script setup lang="ts">
import { computed } from 'vue';
import { filterStore } from '../stores/filter';

const showRecipeMessage = computed(() => filterStore.includes.value('recipe'));
</script>

<template>
  <template v-if="showRecipeMessage">
    <slot />
  </template>
</template>
