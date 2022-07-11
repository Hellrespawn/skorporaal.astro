<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, Ref } from "vue";

import Dot from "@c:Dot.vue";

type Bits = string;

function numberToBits(number: number, expectedBits: number): Bits {
  return number.toString(2).padStart(expectedBits, "0");
}

const props = defineProps<{ bg?: string }>();

const bg = props.bg ?? "bg-secondary-500 dark:bg-primary-500";
const size = "h-2 w-2";

// Set up interval
let interval: number;
let now: Ref<Date> = ref(new Date());

const hours = computed(() => numberToBits(now.value.getHours(), 6));

const minutes = computed(() => numberToBits(now.value.getMinutes(), 6));

const seconds = computed(() => numberToBits(now.value.getSeconds(), 6));

onMounted(() => {
  interval = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  window.clearInterval(interval);
});
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="bits in [hours, minutes, seconds]"
      :key="bits"
      class="flex flex-row justify-end"
    >
      <Dot
        v-for="bit in bits"
        :key="bit"
        :bg="`${+bit ? bg : 'bg-gray-200 dark:bg-gray-800'} ${size}`"
      />
    </div>
  </div>
</template>
