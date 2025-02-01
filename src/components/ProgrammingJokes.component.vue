<template>
  <div v-if="isVisible">
    <ShuffleButtonComponent :disabled="isFetching" @on-click="shuffleNewJokes" />
    <SkeletonListComponent :is-visible="isFetching" />
    <ul
      class="list bg-spotify-dark rounded-box shadow-md p-4 w-full max-w-2xl md:min-w-128 mx-auto"
      v-if="!isFetching"
    >
      <li
        class="border-b border-gray-700 py-3 grid grid-cols-[1fr_auto] gap-y-2 w-full"
        v-for="joke in data"
        :key="joke.id"
      >
        <div class="text-sm font-bold text-gray-300 break-words w-full"></div>

        <div class="flex gap-2">
          <button class="btn btn-square btn-ghost">
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
          <button class="btn btn-square btn-ghost">
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
          class="col-span-2 text-gray-400 text-sm text-left break-normal whitespace-normal w-full"
        >
          {{ joke.setup }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useProgrammingJokesQuery } from '../composables/useProgrammingJokesQuery.composable';
import SkeletonListComponent from './SkeletonList.component.vue';
import ShuffleButtonComponent from './ShuffleButton.component.vue';

interface Props {
  isVisible: boolean;
}
const { isVisible } = defineProps<Props>();

const { isFetching, data, refetch } = useProgrammingJokesQuery();

const shuffleNewJokes = () => {
  refetch();
};
</script>
