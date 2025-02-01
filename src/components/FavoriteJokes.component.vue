<template>
  <div v-if="isVisible">
    <JokeListComponent
      v-if="jokeMap.size > 0"
      :is-visible="true"
      :is-type-visible="true"
      :jokes="favoriteJokes"
      @show-joke="handleShowJoke"
    />
    <div v-else class="text-center p-6 bg-spotify-dark rounded-md shadow-md">
      <h3 class="text-lg font-semibold text-gray-300 mb-4">{{ t('jokes.emptyTitle') }}</h3>
      <p class="text-gray-400 text-base">{{ t('jokes.emptyBody') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import JokeListComponent from './JokeList.component.vue';
import type { Joke } from '../types';
import { computed } from 'vue';
import { convertJokeArrayToMap } from '../helpers/convertJokeArrayToMap.helper';
import { useFavoriteJokes } from '../composables/useFavoriteJokes.composable';
import { useI18n } from 'vue-i18n';

interface Props {
  isVisible: boolean;
}
interface Emits {
  (event: 'onOpenJoke', joke: Joke): void;
}
const { t } = useI18n();
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
