<template>
  <ul
    class="list bg-spotify-dark rounded-box shadow-md p-4 w-full max-w-2xl md:min-w-128 mx-auto"
    v-if="isVisible"
  >
    <li
      class="border-b border-gray-700 py-3 grid grid-cols-[1fr_auto] gap-y-2 w-full hover:cursor-pointer"
      v-for="joke in jokes"
      :key="joke.id"
      @click="handleItemClick(joke)"
    >
      <div class="text-sm font-bold text-gray-300 break-words w-full select-none">
        <span v-if="isTypeVisible">
          {{ joke.type.toUpperCase() }}
        </span>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-square btn-ghost" @click.stop="showJokeHandler(joke.id)">
          <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M6 3L20 12 6 21 6 3z"></path>
            </g>
          </svg>
        </button>
        <button class="btn btn-square btn-ghost" @click.stop="toggleFavoriteHandler(joke)">
          <HeartIcon :is-favorite="true" v-if="isJokeFavorite(joke.id)" />
          <HeartIcon :is-favorite="false" v-if="!isJokeFavorite(joke.id)" />
        </button>
      </div>
      <div
        class="col-span-2 text-gray-400 text-base text-left break-normal whitespace-normal w-full select-none"
      >
        {{ joke.setup }}
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import HeartIcon from './HeartIcon.component.vue';
import { useFavoriteJokes } from '../composables/useFavoriteJokes.composable';
import type { Joke } from '../types';

interface Props {
  isVisible: boolean;
  isTypeVisible?: boolean;
  jokes?: Array<Joke>;
}

interface Emits {
  (event: 'showJoke', id: number): void;
}
let clickTimeout: number | undefined;
let clickCount = new Map();

const { isVisible, isTypeVisible = false, jokes = [] } = defineProps<Props>();
const emit = defineEmits<Emits>();
const { addFavoriteJoke, removeFavoriteJoke, isJokeFavorite } = useFavoriteJokes();

const handleItemClick = (joke: Joke) => {
  clearTimeout(clickTimeout);
  const currentClickCount = (clickCount.get(joke.id) || 0) + 1;
  clickCount.set(joke.id, currentClickCount);

  if (currentClickCount === 1) {
    clickTimeout = setTimeout(() => {
      showJokeHandler(joke.id);
      clickCount = new Map();
    }, 300);
  } else if (currentClickCount === 2) {
    toggleFavoriteHandler(joke);
    clickCount.set(joke.id, 0);
  }
};

const showJokeHandler = (id: number) => {
  emit('showJoke', id);
};

const toggleFavoriteHandler = (joke: Joke) => {
  if (isJokeFavorite(joke.id)) {
    removeFavoriteJoke(joke.id);
  } else {
    addFavoriteJoke(joke);
  }
  clearTimeout(clickTimeout);
};
</script>
