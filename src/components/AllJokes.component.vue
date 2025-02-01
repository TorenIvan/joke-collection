<template>
  <div v-if="isVisible">
    <ShuffleButtonComponent :disabled="isFetching" @on-click="shuffleNewJokes" />
    <SkeletonListComponent :is-visible="isFetching" />
    <JokeListComponent
      :is-visible="!isFetching"
      :is-type-visible="true"
      :jokes="data"
      @show-joke="handleShowJoke"
      @toggle-favorite="handleToggleFavorite"
    />
  </div>
</template>

<script setup lang="ts">
import SkeletonListComponent from './SkeletonList.component.vue';
import ShuffleButtonComponent from './ShuffleButton.component.vue';
import JokeListComponent from './JokeList.component.vue';
import { useAllJokesQuery } from '../composables/useAllJokesQuery.composable';
import type { Joke } from '../types';

interface Props {
  isVisible: boolean;
}
interface Emits {
  (event: 'onOpenJoke', joke: Joke): void;
}

const emit = defineEmits<Emits>();
const { isVisible } = defineProps<Props>();
const { isFetching, data, refetch } = useAllJokesQuery();

const shuffleNewJokes = () => {
  refetch();
};

const handleShowJoke = (id: number) => {
  const joke = (data.value ?? []).find((joke) => joke.id === id);
  if (joke !== undefined) {
    const jokeRaw = JSON.parse(JSON.stringify(joke));
    emit('onOpenJoke', jokeRaw);
  }
};
const handleToggleFavorite = (id: number) => {
  console.log('toggling joke as fav with id: ', id);
};
</script>
