<script lang="ts">
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

export default {
  components: {
    Dot,
  },
  props: {
    bg: { type: String, required: false },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.now = new Date();
    }, 1000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
  data() {
    return {
      finalBg: this.bg ?? "bg-secondary-500 dark:bg-primary-500",
      size: "h-2 w-2",

      now: new Date(),
      interval: undefined,
      hours: undefined,
      minutes: undefined,
      seconds: undefined,
    };
  },
  watch: {
    now: {
      handler() {
        this.hours = numberToBits(this.now.getHours(), 6);
        this.minutes = numberToBits(this.now.getMinutes(), 6);
        this.seconds = numberToBits(this.now.getSeconds(), 6);
      },
      immediate: true,
    },
  },
};
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="bits in [hours, minutes, seconds]"
      class="flex flex-row justify-end"
    >
      <Dot
        v-for="bit in bits"
        :bg="`${+bit ? finalBg : 'bg-gray-200 dark:bg-gray-800'} ${size}`"
      />
    </div>
  </div>
</template>
