<template>
  <div v-if="isVisible">
    <JokeFavoriteGridComponent
      v-if="jokeMap.size > 0"
      :jokes="sortedJokes"
      @show-joke="handleShowJoke"
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
    <div v-else class="text-center p-6 bg-spotify-dark rounded-md shadow-md">
      <h3 class="text-lg font-semibold text-gray-300 mb-4">{{ t('jokes.emptyTitle') }}</h3>
      <p class="text-gray-400 text-base">{{ t('jokes.emptyBody') }}</p>
    </div>
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

interface Props {
  isVisible: boolean;
}
interface Emits {
  (event: 'onOpenJoke', joke: Joke): void;
}
const { t } = useI18n();
const emit = defineEmits<Emits>();
const { isVisible } = defineProps<Props>();
const { favoriteJokes } = useFavoriteJokes();
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

const handleShowJoke = (id: number) => {
  const joke = jokeMap.value.get(id);
  if (joke !== undefined) {
    const jokeRaw = JSON.parse(JSON.stringify(joke));
    emit('onOpenJoke', jokeRaw);
  }
};
</script>
