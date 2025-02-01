<template>
  <div v-if="isVisible">
    <ShuffleButtonComponent :disabled="isFetching" @on-click="shuffleNewJokes" />
    <SkeletonListComponent :is-visible="isFetching" />
    <JokeListComponent :is-visible="!isFetching" :jokes="data" @show-joke="handleShowJoke" />
  </div>
</template>

<script setup lang="ts">
import { useKnockKnockJokesQuery } from '../composables/useKnockKnockJokesQuery.composable';
import SkeletonListComponent from './SkeletonList.component.vue';
import ShuffleButtonComponent from './ShuffleButton.component.vue';
import JokeListComponent from './JokeList.component.vue';
import type { Joke } from '../types';
import { computed } from 'vue';
import { convertJokeArrayToMap } from '../helpers/convertJokeArrayToMap.helper';

interface Props {
  isVisible: boolean;
}
interface Emits {
  (event: 'onOpenJoke', joke: Joke): void;
}
const emit = defineEmits<Emits>();
const { isVisible } = defineProps<Props>();
const { isFetching, data, refetch } = useKnockKnockJokesQuery();
const jokeMap = computed(() => convertJokeArrayToMap(data.value));

const shuffleNewJokes = () => {
  refetch();
};

const handleShowJoke = (id: number) => {
  const joke = jokeMap.value.get(id);
  if (joke !== undefined) {
    const jokeRaw = JSON.parse(JSON.stringify(joke));
    emit('onOpenJoke', jokeRaw);
  }
};
</script>
