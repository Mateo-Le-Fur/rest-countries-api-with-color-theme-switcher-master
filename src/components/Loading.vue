<template>
  <div
    :class="darkMode === true ? 'dark_mode_lds_dual_ring' : 'lds_dual_ring'"
  ></div>
</template>

<script setup lang="ts">
defineProps<{
  darkMode: boolean;
}>();
</script>

<style lang="scss" scoped>
// dark mode

.dark_mode_lds_dual_ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  z-index: 5;
}
.dark_mode_lds_dual_ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid var(--White);
  border-color: var(--White) transparent var(--White) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

//
.lds_dual_ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds_dual_ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid var(--Very_Dark_Blue);
  border-color: var(--Very_Dark_Blue) transparent var(--Very_Dark_Blue)
    transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
