import { computed, ref, type Ref } from 'vue';
import type { FavoriteJoke, SortType } from '../types';

export function useSortingJokes(favoriteJokes: Ref<Array<FavoriteJoke>>) {
  const sortSetup = ref<SortType>(undefined);
  const sortType = ref<SortType>(undefined);
  const sortRating = ref<SortType>(undefined);

  const sortedJokes = computed(() => {
    let jokes = [...favoriteJokes.value];

    if (sortSetup.value !== undefined) {
      jokes.sort((a, b) =>
        sortSetup.value === 'asc' ? a.setup.localeCompare(b.setup) : b.setup.localeCompare(a.setup)
      );
    } else if (sortType.value !== undefined) {
      jokes.sort((a, b) =>
        sortType.value === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type)
      );
    } else if (sortRating.value !== undefined) {
      jokes.sort((a, b) =>
        sortRating.value === 'asc'
          ? (a.rating || 0) - (b.rating || 0)
          : (b.rating || 0) - (a.rating || 0)
      );
    }
    return jokes;
  });

  const handleSortByType = () => {
    if (sortType.value === undefined) {
      sortType.value = 'asc';
    } else if (sortType.value === 'asc') {
      sortType.value = 'desc';
    } else {
      sortType.value = undefined;
    }
    sortSetup.value = undefined;
    sortRating.value = undefined;
  };

  const handleSortBySetup = () => {
    if (sortSetup.value === undefined) {
      sortSetup.value = 'asc';
    } else if (sortSetup.value === 'asc') {
      sortSetup.value = 'desc';
    } else {
      sortSetup.value = undefined;
    }
    sortType.value = undefined;
    sortRating.value = undefined;
  };

  const handleSortByRating = () => {
    if (sortRating.value === undefined) {
      sortRating.value = 'asc';
    } else if (sortRating.value === 'asc') {
      sortRating.value = 'desc';
    } else {
      sortRating.value = undefined;
    }
    sortType.value = undefined;
    sortSetup.value = undefined;
  };

  return {
    sortedJokes,
    sortSetup,
    sortType,
    sortRating,
    handleSortByType,
    handleSortBySetup,
    handleSortByRating,
  };
}
