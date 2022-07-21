<script setup lang="ts">
function toggle() {
  const toggled = document.documentElement.classList.toggle('dark');

  localStorage.setItem('darkMode', toggled.toString());
}
</script>

<template>
  <div @click="toggle()">
    <slot />
  </div>
</template>
