<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import Countries from "@/components/Countries.vue";
import Country from "@/components/Country.vue";
import type { Component as C } from "vue";
import { reactive } from "vue";

const state = reactive<{
  page: string;
  data: string | null;
  darkMode: boolean;
}>({
  page: "Countries",
  data: null,
  darkMode: false,
});

const pages: { [s: string]: C } = {
  Countries,
  Country,
};

function navigate(page: string, data: string | null): void {
  state.page = page;

  if (data) {
    state.data = data;
  }
}

function changeThemeColor(isActive: boolean = false): boolean {
  const body = document.querySelector("body");
  if (isActive) {
    body?.classList.add("very_dark");
  } else {
    body?.classList.remove("very_dark");
  }

  return (state.darkMode = isActive);
}
</script>

<template>
  <div class="app-container">
    <TheHeader
      @change-theme-color="changeThemeColor"
      :dark-mode="state.darkMode"
    />
    <Transition mode="out-in" appear>
      <KeepAlive include="Countries">
        <Component
          @change-theme-color="changeThemeColor"
          @navigate="navigate"
          :data="state.data"
          :dark-mode="state.darkMode"
          :is="pages[state.page]"
        />
      </KeepAlive>
    </Transition>
  </div>
</template>

<style lang="scss">
@import "@/assets/base.scss";

//Dark Mode

.dark {
  background-color: hsl(209, 23%, 22%) !important;
  color: var(--White) !important;
}

.very_dark {
  background-color: hsl(207, 26%, 17%) !important;
  color: var(--White) !important;
}

.dark_mode_input_placeholder {
  &::placeholder {
    color: var(--White);
  }
}

// Transition
body,
header,
input,
i,
.container,
.search,
.select-country,
.card {
  transition: background-color 0.2s ease-in-out;
}

.v-leave-to,
.v-enter-from {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}

.v-leave-active,
.v-enter-active {
  transition: all 0.2s;
}
</style>
