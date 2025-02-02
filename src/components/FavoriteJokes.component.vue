<template>
  <div v-if="isVisible">
    <div class="mb-6" v-if="jokeMap.size > 0">
      <div class="flex flex-col md:flex-row justify-around items-center w-full mb-4">
        <div class="text-lg font-semibold text-center md:text-left">
          {{ t('jokes.averageRating') }}: {{ (totalRating / jokeMap.size).toFixed(1) }}
        </div>
        <div class="text-lg font-semibold text-secondary text-center md:text-left">
          {{ t('jokes.totalFavorites') }}: {{ jokeMap.size }}
        </div>
      </div>
      <input
        type="text"
        :placeholder="t('jokes.searchSetup')"
        class="input input-bordered w-full max-w-xs mb-6 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent p-3"
        aria-details="Input to search your favorite jokes by setup"
        v-model="searchText"
      />
      <section class="flex flex-col sm:flex-row justify-center sm:items-center mb-6">
        <FilterByRatingComponent
          :selected-rating="selectedRatingFilter"
          @on-apply-filter="handleApplyFilter"
          class="w-full sm:w-auto"
        />
      </section>
    </div>
    <div v-if="jokeMap.size === 0" class="text-center p-6 bg-spotify-dark rounded-md shadow-md">
      <h3 class="text-lg font-semibold text-gray-300 mb-4">{{ t('jokes.emptyTitle') }}</h3>
      <p class="text-gray-400 text-base">{{ t('jokes.emptyBody') }}</p>
    </div>
    <div
      v-else-if="filteredJokes.length === 0"
      class="text-center p-6 bg-spotify-dark rounded-md shadow-md"
    >
      <h3 class="text-lg font-semibold text-gray-300 mb-4">
        {{ t('jokes.emptyFilteredTitle') }} {{ selectedRatingFilter }}
      </h3>
    </div>
    <div
      v-else-if="searchedJokes.length === 0"
      class="text-center p-6 bg-spotify-dark rounded-md shadow-md"
    >
      <h3 class="text-lg font-semibold text-gray-300 mb-4">
        {{ t('jokes.emptyFilteredSearchTitle') }}
      </h3>
    </div>
    <JokeFavoriteGridComponent
      v-else
      :jokes="searchedJokes"
      @show-joke="handleShowJoke"
      @on-joke-rating="handleUpdateJokeRating"
    >
      <template v-slot:header>
        <thead>
          <tr>
            <th>#</th>
            <th
              @click="handleSortBySetup()"
              class="text-sm font-bold text-gray-300 break-words w-full select-none cursor-pointer"
            >
              {{ t('jokes.setup') }}
              <span v-if="sortSetup">{{ sortSetup === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              @click="handleSortByType()"
              class="text-sm font-bold text-gray-300 break-words w-full select-none cursor-pointer"
            >
              {{ t('jokes.type') }}
              <span v-if="sortType">{{ sortType === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th class="text-sm font-bold text-gray-300 break-words w-full select-none">
              {{ t('jokes.actions') }}
            </th>
            <th
              class="text-sm font-bold text-gray-300 break-words w-full select-none cursor-pointer"
              @click="handleSortByRating()"
            >
              {{ t('jokes.rating') }}
              <span v-if="sortRating">{{ sortRating === 'asc' ? '▲' : '▼' }}</span>
            </th>
          </tr>
        </thead>
      </template>
    </JokeFavoriteGridComponent>
  </div>
</template>

<script setup lang="ts">
import type { Joke } from '../types';
import { computed } from 'vue';
import { convertJokeArrayToMap } from '../helpers/convertJokeArrayToMap.helper';
import { useFavoriteJokes } from '../composables/useFavoriteJokes.composable';
import { useI18n } from 'vue-i18n';
import JokeFavoriteGridComponent from './JokeFavoriteGrid.component.vue';
import { useSortingJokes } from '../composables/useSortingJokes.composable';
import FilterByRatingComponent from './FilterByRating.component.vue';
import { useFilteringJokes } from '../composables/useFilteringJokes.composable';
import { useSearchingJokes } from '../composables/useSearchingJokes.composable';

interface Props {
  isVisible: boolean;
}
interface Emits {
  (event: 'onOpenJoke', joke: Joke): void;
}
const { t } = useI18n();
const emit = defineEmits<Emits>();
const { isVisible } = defineProps<Props>();
const { favoriteJokes, updateFavoriteJokeRating } = useFavoriteJokes();
const jokeMap = computed(() => convertJokeArrayToMap(favoriteJokes.value));
const {
  sortedJokes,
  sortSetup,
  sortType,
  sortRating,
  handleSortByType,
  handleSortBySetup,
  handleSortByRating,
} = useSortingJokes(favoriteJokes);
const { selectedRatingFilter, filteredJokes, handleApplyFilter } = useFilteringJokes(sortedJokes);
const { searchText, searchedJokes } = useSearchingJokes(filteredJokes);
const totalRating = computed(() =>
  favoriteJokes.value.reduce((accumulator, currentJoke) => {
    return accumulator + currentJoke.rating;
  }, 0)
);

const handleShowJoke = (id: number) => {
  const joke = jokeMap.value.get(id);
  if (joke !== undefined) {
    const jokeRaw = JSON.parse(JSON.stringify(joke));
    emit('onOpenJoke', jokeRaw);
  }
};

const handleUpdateJokeRating = (id: number, rating: number) => {
  const joke = jokeMap.value.get(id);
  if (joke !== undefined) {
    const jokeRaw = JSON.parse(JSON.stringify(joke));
    if (jokeRaw.rating === rating) {
      updateFavoriteJokeRating(id, 0);
    } else {
      updateFavoriteJokeRating(id, rating);
    }
  }
};
</script>
