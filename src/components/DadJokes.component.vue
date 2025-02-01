<template>
  <div v-if="isVisible">
    <ShuffleButtonComponent :disabled="isFetching" @on-click="shuffleNewJokes" />
    <SkeletonListComponent :is-visible="isFetching" />
    <JokeListComponent
      :is-visible="!isFetching"
      :jokes="data"
      @show-joke="handleShowJoke"
      @toggle-favorite="handleToggleFavorite"
    />
  </div>
</template>

<script setup lang="ts">
import { useDadJokesQuery } from '../composables/useDadJokesQuery.composable';
import SkeletonListComponent from './SkeletonList.component.vue';
import ShuffleButtonComponent from './ShuffleButton.component.vue';
import JokeListComponent from './JokeList.component.vue';

interface Props {
  isVisible: boolean;
}
const { isVisible } = defineProps<Props>();

const { isFetching, data, refetch } = useDadJokesQuery();

const shuffleNewJokes = () => {
  refetch();
};

const handleShowJoke = (id: number) => {
  console.log('showing joke with id: ', id);
};
const handleToggleFavorite = (id: number) => {
  console.log('toggling joke as fav with id: ', id);
};
</script>
