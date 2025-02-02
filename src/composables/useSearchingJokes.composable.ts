import { computed, ref, type Ref } from 'vue';
import type { FavoriteJoke } from '../types';

export function useSearchingJokes(filteredJokes: Ref<Array<FavoriteJoke>>) {
  const searchText = ref<string>('');

  const searchedJokes = computed(() => {
    if (!searchText.value.trim()) {
      return filteredJokes.value;
    }
    return filteredJokes.value.filter((joke) =>
      joke.setup.toLowerCase().includes(searchText.value.toLowerCase())
    );
  });

  return {
    searchText,
    searchedJokes,
  };
}
