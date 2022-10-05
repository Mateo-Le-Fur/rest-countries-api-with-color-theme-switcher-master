<script lang="ts">
export default {
  name: "Countries",
};
</script>

<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from "vue";
import { fetchCountries, fetchCountriesByName } from "@/services/countries";
import Loading from "@/components/Loading.vue";

defineProps<{
  darkMode: boolean;
}>();

const emit = defineEmits<{
  (e: "navigate", page: string, data: string | null): void | [];
}>();

const state = reactive<{
  search: string;
  filters: string[];
  countries: any[] | {} | undefined;
  isLoading: boolean;
}>({
  search: "",
  filters: ["Africa", "America", "Asia", "Europe", "Oceania", "All"],
  countries: [],
  isLoading: false,
});

const filterBox = ref<boolean>(false);
const filterValue = ref<string | null>("All");

watchEffect(async () => {
  if (state.search === "") {
    state.isLoading = true;

    state.countries = await fetchCountries(filterValue.value);

    state.isLoading = false;
  }
});

watch(
  () => state.search,
  async () => {
    if (state.search !== "") {
      state.countries = await fetchCountriesByName(state.search);
    }
  }
);

function setFilter(event: Event) {
  const target = event.target as HTMLLIElement;
  filterValue.value = target.textContent;
}
</script>

<template>
  <main>
    <div class="filter d-flex align-items-center">
      <div class="search d-flex align-items-center" :class="{ dark: darkMode }">
        <i class="fa-solid fa-magnifying-glass" :class="{ dark: darkMode }"></i>
        <input
          :value="state.search"
          @input="state.search = $event.target.value"
          class="p-10"
          :class="{
            dark: darkMode,
            dark_mode_input_placeholder: darkMode,
          }"
          type="text"
          placeholder="Search for a country..."
        />
      </div>
      <div
        @click="filterBox = !filterBox"
        class="select-country d-flex align-items-center"
        :class="{ dark: darkMode }"
      >
        <span>{{
          filterValue !== "All" ? filterValue : "Filter By Region"
        }}</span>
        <i class="fa-solid fa-chevron-down"></i>
        <Transition name="filter">
          <div
            class="filters-container d-flex flex-column"
            :class="{ dark: darkMode }"
            v-if="filterBox"
          >
            <ul>
              <li
                :class="{ dark_mode_hover: darkMode }"
                @click="setFilter($event)"
                v-for="filter of state.filters"
                :key="filter"
              >
                {{ filter }}
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>

    <div
      v-if="state.countries && !state.isLoading"
      class="countries-container d-flex"
    >
      <TransitionGroup appear name="card">
        <div
          v-for="country of state.countries"
          :key="country.name.common"
          class="card"
          :class="{ dark: darkMode }"
          @click="emit('navigate', 'Country', country.name.common)"
        >
          <div class="d-flex">
            <img :src="`${country.flags.png}`" alt="flag" />
          </div>
          <div class="p-20">
            <h4>{{ country.name.common }}</h4>
            <ul>
              <li class="mb-5">
                Population:
                <span>{{ country.population.toLocaleString() }}</span>
              </li>
              <li class="mb-5">
                Région: <span>{{ country.region }}</span>
              </li>
              <li class="mb-5">
                Capital:
                <span>{{ country.capital ? country.capital[0] : "" }}</span>
              </li>
            </ul>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div
      class="loading-container d-flex align-items-center justify-content-center"
      v-else-if="state.isLoading"
    >
      <Loading :dark-mode="darkMode" />
    </div>
    <div v-else>
      <p>No countries found</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use "@/assets/_mixins.scss" as m;

main {
  padding: 2.5rem 4rem 2.5rem 4rem;
  min-height: calc(100vh - 75px);

  @include m.xs {
    padding: 0;
  }

  .filter {
    justify-content: space-between;
    margin-bottom: 3rem;

    @include m.xs {
      align-items: flex-start;
      padding: 1.3rem;
      flex-direction: column;
      width: 100%;
    }

    .search {
      gap: 1.2rem;
      height: 60px;
      background-color: var(--White);
      box-shadow: 0px 0px 3px -2px #000000;

      @include m.xs {
        width: 100%;
      }

      i {
        margin-left: 1.6rem;
        color: gray;
      }
    }

    input {
      width: 500px;
      outline: none;
      border: none;
    }
  }

  .select-country {
    font-weight: 600;
    position: relative;
    background-color: var(--White);
    cursor: pointer;
    justify-content: space-around;
    padding: 5px;
    outline: none;
    border: none;
    width: 230px;
    height: 60px;
    border-radius: 5px;
    box-shadow: 0px 0px 3px -2px #000000;
    @include m.xs {
      margin-top: 2rem;
    }

    .filters-container {
      border-radius: 5px;
      background-color: var(--White);
      width: inherit;
      position: absolute;
      top: 4.2rem;
      z-index: 3;

      ul {
        margin: 0;
        li {
          padding: 10px 0 10px 20px;

          &:hover {
            background-color: var(--Very_Light_Gray);
          }
        }
        .dark_mode_hover {
          &:hover {
            background-color: var(--Very_Dark_Blue) !important;
          }
        }
      }
    }
  }

  .countries-container {
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 4rem;
    @include m.xs {
      padding: 0 3rem;
    }

    .card {
      cursor: pointer;
      width: 320px;
      background-color: var(--White);
      color: var(--Very_Dark_Blue);
      border-radius: 5px;

      img {
        width: 100%;
        height: 250px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      li {
        font-weight: 600;

        span {
          font-weight: 300;
        }
      }
    }
  }
}

.loading-container {
  height: calc(100vh - 350px);
}

.card-leave-to,
.card-enter-from {
  opacity: 0;
}

.card-leave-from,
.card-enter-to {
  opacity: 1;
}

.card-leave-active,
.card-enter-active {
  transition: all 0.5s;
}

.filter-leave-to,
.filter-enter-from {
  opacity: 0;
}

.filter-leave-from,
.filter-enter-to {
  opacity: 1;
}

.filter-leave-active,
.filter-enter-active {
  transition: all 0.3s;
}
</style>
