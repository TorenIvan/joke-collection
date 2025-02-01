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
    >
      <div class="text-sm font-bold text-gray-300 break-words w-full">
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
        <button class="btn btn-square btn-ghost" @click.stop="toggleFavoriteHandler(joke.id)">
          <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <div
        class="col-span-2 text-gray-400 text-base text-left break-normal whitespace-normal w-full"
      >
        {{ joke.setup }}
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Joke } from '../types';

interface Props {
  isVisible: boolean;
  isTypeVisible?: boolean;
  jokes?: Array<Joke>;
}

interface Emits {
  (event: 'showJoke', id: number): void;
  (event: 'toggleFavorite', id: number): void;
}

const { isVisible, isTypeVisible = false, jokes = [] } = defineProps<Props>();
const emit = defineEmits<Emits>();

const showJokeHandler = (id: number) => {
  emit('showJoke', id);
};

const toggleFavoriteHandler = (id: number) => {
  emit('toggleFavorite', id);
};
</script>
