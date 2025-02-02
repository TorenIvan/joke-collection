<template>
  <div class="overflow-x-auto bg-spotify-dark p-4 rounded-lg shadow-md">
    <table class="table">
      <slot name="header"></slot>
      <tbody>
        <tr
          class="hover"
          v-for="(joke, index) in jokes"
          :key="joke.id"
          @dblclick="toggleFavoriteHandler(joke)"
        >
          <th class="select-none">{{ index }}</th>
          <td class="select-none min-w-[200px] break-words">{{ joke.setup }}</td>
          <td class="select-none">{{ joke.type }}</td>
          <td class="flex-col gap-2">
            <button class="btn btn-square btn-ghost" @click.stop="toggleFavoriteHandler(joke)">
              <HeartIconComponent :is-favorite="true" v-if="isJokeFavorite(joke.id)" />
              <HeartIconComponent :is-favorite="false" v-if="!isJokeFavorite(joke.id)" />
            </button>
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
          </td>
          <td>
            <div class="rating">
              <input
                v-for="ratingNumber in 5"
                :key="ratingNumber"
                type="radio"
                :name="'rating-' + joke.id"
                class="mask mask-star bg-green-500"
                :checked="joke.rating === ratingNumber"
                :value="ratingNumber"
                @click.stop="updateJokeRating(joke.id, ratingNumber)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useFavoriteJokes } from '../composables/useFavoriteJokes.composable';
import type { FavoriteJoke } from '../types';
import HeartIconComponent from './HeartIcon.component.vue';
const { addFavoriteJoke, removeFavoriteJoke, isJokeFavorite } = useFavoriteJokes();

interface Props {
  jokes?: Array<FavoriteJoke>;
}

interface Emits {
  (event: 'showJoke', id: number): void;
  (event: 'onJokeRating', id: number, rating: number): void;
}

const { jokes = [] } = defineProps<Props>();
const emit = defineEmits<Emits>();

const showJokeHandler = (id: number) => {
  emit('showJoke', id);
};

const updateJokeRating = (id: number, rating: number) => {
  emit('onJokeRating', id, rating);
};

const toggleFavoriteHandler = (joke: FavoriteJoke) => {
  if (isJokeFavorite(joke.id)) {
    removeFavoriteJoke(joke.id);
  } else {
    addFavoriteJoke(joke);
  }
};
</script>
