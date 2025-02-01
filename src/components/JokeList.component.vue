<template>
  <ul
    class="list bg-spotify-dark rounded-box shadow-md p-4 w-full max-w-2xl md:min-w-128 mx-auto"
    v-if="isVisible"
  >
    <li
      class="border-b border-gray-700 py-3 grid grid-cols-[1fr_auto] gap-y-2 w-full hover:cursor-pointer"
      v-for="joke in jokes"
      :key="joke.id"
      @click="showJokeHandler(joke.id)"
      @dblclick="toggleFavoriteHandler(joke)"
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
          <svg
            v-if="isJokeFavorite(joke.id)"
            class="size-[1.2em] text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              fill="currentColor"
              stroke="none"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </g>
          </svg>
          <svg
            v-else
            class="size-[1.2em] text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </g>
          </svg>
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

const { isVisible, isTypeVisible = false, jokes = [] } = defineProps<Props>();
const emit = defineEmits<Emits>();
const { addFavoriteJoke, removeFavoriteJoke, isJokeFavorite } = useFavoriteJokes();

const showJokeHandler = (id: number) => {
  clearTimeout(clickTimeout);
  clickTimeout = setTimeout(() => {
    emit('showJoke', id);
    clearTimeout(clickTimeout);
  }, 250);
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
