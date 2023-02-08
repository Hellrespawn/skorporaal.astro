<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, type Ref } from 'vue';
import { useStore } from '@nanostores/vue';
import { showRecipes } from '../stores/recipe.store';
import Dot from './DotComponent.vue';

const $showRecipes = useStore(showRecipes);

const expectedBits = Math.ceil(Math.max(Math.log2(24), Math.log2(60)));
const fps = 24;

// Set up interval
let interval: number;
const now: Ref<Date> = ref(new Date());

const hours = computed(() => now.value.getHours());

const minutes = computed(() => now.value.getMinutes());

const seconds = computed(() => now.value.getSeconds());

onMounted(() => {
  interval = window.setInterval(() => {
    now.value = new Date();
  }, 1000 / fps);
});

onUnmounted(() => {
  window.clearInterval(interval);
});
</script>

<template>
  <div class="flex flex-col" @dblclick="showRecipes.set(!$showRecipes)">
    <div
      v-for="(number, index) in [hours, minutes, seconds]"
      :key="[number, index].join()"
      class="flex flex-row justify-end"
    >
      <Dot
        v-for="bit in expectedBits"
        :key="[number, index, bit].join()"
        :bg="
          // largest to smallest
          number & (1 << (expectedBits - bit))
            ? 'bg-secondary-500 dark:bg-primary-500'
            : 'bg-gray-200 dark:bg-gray-800'
        "
      />
    </div>
  </div>
</template>
