<template>
  <header class="d-flex align-items-center" :class="{ dark: darkMode }">
    <h1>Where in the world?</h1>
    <div
      @click="emit('changeThemeColor', !darkMode)"
      class="dark-mode d-flex align-items-center"
    >
      <i class="fa-regular fa-moon mr-10"></i>
      <span>Dark Mode</span>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  darkMode: boolean;
}>();

const emit = defineEmits<{
  (e: "changeThemeColor", isActive: boolean): boolean;
}>();
</script>

<style lang="scss" scoped>
@use "@/assets/_mixins.scss" as m;

header {
  position: sticky;
  top: 0;
  background-color: var(--White);
  justify-content: space-between;
  padding: 1rem 4rem 1rem 4rem;
  z-index: 2;

  @include m.xs {
    padding: 2rem 1rem 2rem 1rem;
  }

  h1 {
    @include m.xs {
      font-size: 1rem;
    }
  }

  .dark-mode {
    cursor: pointer;
    span {
      font-weight: 600;
    }
  }
}
</style>
