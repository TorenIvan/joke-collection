<template>
  <div class="overflow-x-auto">
    <table class="table">
      <slot name="header"></slot>
      <tbody>
        <tr
          class="hover"
          v-for="(joke, index) in jokes"
          :key="joke.id"
          @click="showJokeHandler(joke.id)"
        >
          <th>{{ index }}</th>
          <td>{{ joke.setup }}</td>
          <td>{{ joke.type }}</td>
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
              <input type="radio" name="rating-1" class="mask mask-star" />
              <input type="radio" name="rating-1" class="mask mask-star" />
              <input type="radio" name="rating-1" class="mask mask-star" />
              <input type="radio" name="rating-1" class="mask mask-star" />
              <input type="radio" name="rating-1" class="mask mask-star" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useFavoriteJokes } from '../composables/useFavoriteJokes.composable';
import type { Joke } from '../types';
import HeartIconComponent from './HeartIcon.component.vue';
const { addFavoriteJoke, removeFavoriteJoke, isJokeFavorite } = useFavoriteJokes();

interface Props {
  jokes?: Array<Joke>;
}

interface Emits {
  (event: 'showJoke', id: number): void;
}

const { jokes = [] } = defineProps<Props>();
const emit = defineEmits<Emits>();

const showJokeHandler = (id: number) => {
  emit('showJoke', id);
};

const toggleFavoriteHandler = (joke: Joke) => {
  if (isJokeFavorite(joke.id)) {
    removeFavoriteJoke(joke.id);
  } else {
    addFavoriteJoke(joke);
  }
};
</script>
