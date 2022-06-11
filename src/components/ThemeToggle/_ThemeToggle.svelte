<script lang="ts">
  function toggle(): void {
    const toggled = document.documentElement.classList.toggle("dark");

    localStorage.setItem("darkMode", toggled.toString());
  }
</script>

<div on:click={toggle}>
  <slot />
</div>
