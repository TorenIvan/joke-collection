<template>
  <div v-if="isVisible">
    <JokeListComponent
      :is-visible="true"
      :is-type-visible="true"
      :jokes="favoriteJokes"
      @show-joke="handleShowJoke"
    />
  </div>
</template>

<script setup lang="ts">
import JokeListComponent from './JokeList.component.vue';
import type { Joke } from '../types';
import { computed } from 'vue';
import { convertJokeArrayToMap } from '../helpers/convertJokeArrayToMap.helper';
import { useFavoriteJokes } from '../composables/useFavoriteJokes.composable';

interface Props {
  isVisible: boolean;
}
interface Emits {
  (event: 'onOpenJoke', joke: Joke): void;
}
const emit = defineEmits<Emits>();
const { isVisible } = defineProps<Props>();
const { favoriteJokes } = useFavoriteJokes();
const jokeMap = computed(() => convertJokeArrayToMap(favoriteJokes.value));

const handleShowJoke = (id: number) => {
  const joke = jokeMap.value.get(id);
  if (joke !== undefined) {
    const jokeRaw = JSON.parse(JSON.stringify(joke));
    emit('onOpenJoke', jokeRaw);
  }
};
</script>
