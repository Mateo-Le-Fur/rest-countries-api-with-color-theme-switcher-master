<script setup lang="ts">
import { reactive } from "vue";
import { fetchCountriesByName } from "@/services/countries";

const props = defineProps<{
  data: string;
  darkMode: boolean;
}>();

const emit = defineEmits<{
  (e: "navigate", page: string, data: string | null): void | [];
}>();

const state = reactive<{
  country: [] | boolean | undefined;
}>({
  country: [],
});

(async () => {
  state.country = await fetchCountriesByName(props.data);
})();
</script>

<template>
  <section>
    <div
      @click="emit('navigate', 'Countries', null)"
      class="button-back"
      :class="{ dark: darkMode }"
    >
      <i class="fa-solid fa-arrow-left-long"></i>
      <button :class="{ dark: darkMode }">Back</button>
    </div>
    <TransitionGroup appear name="country">
      <div
        v-for="country of state.country"
        :key="country.name.common"
        class="container d-flex"
        :class="{ very_dark: darkMode }"
      >
        <img :src="`${country.flags.png}`" alt="flag" />
        <div class="info-container">
          <h2>{{ country.name.common }}</h2>
          <div class="info d-flex">
            <ul>
              <li>
                Native Name:
                <span>{{
                  Object.values(country.name.nativeName)[0].common
                }}</span>
              </li>
              <li>
                Population:
                <span>{{ country.population.toLocaleString() }}</span>
              </li>
              <li>
                Region: <span>{{ country.region }}</span>
              </li>
              <li>
                Sub Region: <span>{{ country.subregion }}</span>
              </li>
              <li>
                Capital:
                <span>{{ country.capital ? country.capital[0] : "" }}</span>
              </li>
            </ul>
            <ul>
              <li>
                Top Level Domain:
                <span>{{ country.tld ? country.tld[0] : "" }}</span>
              </li>
              <li>
                Currencies:
                <span>{{ Object.values(country.currencies)[0].name }}</span>
              </li>
              <li>
                Languages:
                <span v-for="language of country.languages">{{
                  language
                }}</span>
              </li>
            </ul>
          </div>
          <div class="borders-countries d-flex align-items-center">
            <span class="mr-20">Border Countries:</span>
            <ul class="border-country d-flex align-items-center">
              <li v-for="border of country.borders">
                {{ border }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </section>
</template>

<style lang="scss">
@use "@/assets/_mixins.scss" as m;
@import "@/assets/base.scss";

section {
  padding: 4rem;
  @include m.xs {
    padding: 2rem 2rem 0 2rem;
  }

  .button-back {
    cursor: pointer;
    padding: 0.5rem 1.2rem;
    display: inline-flex;
    align-items: center;
    background-color: var(--White);
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.52);
    border-radius: 5px;

    button {
      cursor: pointer;
      background-color: var(--White);
      border: none;
      outline: none;
      margin-left: 5px;
    }
  }

  .container {
    margin-top: 4.5rem;
    gap: 5rem;
    //color: var(--Very_Dark_Blue);
    @include m.xs {
      margin-top: 3.5rem;
      flex-direction: column;
      gap: 0;
    }

    h2 {
      font-size: 2rem;
      @include m.xs {
        font-size: 1.4rem;
      }
    }

    img {
      width: 700px;
      min-width: 300px;
      height: 450px;
      @include m.xs {
        height: 300px;
      }
    }

    li {
      margin-bottom: 5px;
      font-weight: 600;

      span {
        font-weight: 300;
      }
    }

    .info-container {
      width: 900px;
      min-width: 400px;
      margin-top: 4rem;
      height: inherit;
      @include m.xs {
        margin-top: 1.5rem;
        width: 100%;
        min-width: auto;
      }

      .info {
        justify-content: space-between;
        @include m.xs {
          display: flex;
          flex-direction: column;
        }
      }

      .borders-countries {
        @include m.xs {
          flex-direction: column;
          align-items: flex-start;
        }
        .border-country {
          gap: 1rem;

          li {
            padding: 3px 15px;
            margin: 0;
            border-radius: 3px;
            box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.68);
          }
        }
      }
    }
  }

  .country-enter-from {
    opacity: 0;
  }

  .country-leave-from,
  .country-enter-to {
    opacity: 1;
  }

  .country-leave-active,
  .country-enter-active {
    transition: all 1s;
  }
}
</style>
