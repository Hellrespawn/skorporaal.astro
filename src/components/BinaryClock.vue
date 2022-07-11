<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";

import Dot from "@c:Dot.vue";

type Bits = string;

function leadingZeros(string: string, length: number): string {
  if (string.length > length) {
    throw new Error("String longer than desired length!");
  }
  return ("0".repeat(length) + string).slice(-length);
}

function numberToBits(number: number, expectedBits: number): Bits {
  return leadingZeros(number.toString(2), expectedBits);
}

// Set up interval
let interval;

onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

const props = defineProps<{ bg?: string }>();

let now = ref(new Date());

const bg = props.bg ?? "bg-secondary-500 dark:bg-primary-500";
const size = "h-2 w-2";

const hours = computed(() => numberToBits(now.value.getHours(), 6));

const minutes = computed(() => numberToBits(now.value.getMinutes(), 6));

const seconds = computed(() => numberToBits(now.value.getSeconds(), 6));
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="bits in [hours, minutes, seconds]"
      class="flex flex-row justify-end"
    >
      <Dot
        v-for="bit in bits"
        :bg="`${+bit ? bg : 'bg-gray-200 dark:bg-gray-800'} ${size}`"
      />
    </div>
  </div>
</template>
