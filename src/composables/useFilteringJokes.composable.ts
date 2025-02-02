import { computed, ref, type Ref } from 'vue';
import type { FavoriteJoke } from '../types';

export function useFilteringJokes(sortedJokes: Ref<Array<FavoriteJoke>>) {
  const selectedRatingFilter = ref<number | undefined>();
  const filteredJokes = computed(() => {
    if (selectedRatingFilter.value === undefined) {
      return sortedJokes.value;
    }
    return sortedJokes.value.filter((joke) => joke.rating === selectedRatingFilter.value);
  });

  const handleApplyFilter = (rating: number | undefined) => {
    if (selectedRatingFilter.value === rating) {
      selectedRatingFilter.value = undefined;
    } else {
      selectedRatingFilter.value = rating;
    }
  };

  return {
    selectedRatingFilter,
    filteredJokes,
    handleApplyFilter,
  };
}
