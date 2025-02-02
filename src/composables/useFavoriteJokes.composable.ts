import { computed } from 'vue';
import { useJokeStore } from '../store/joke.store';
import type { Joke } from '../types';

export function useFavoriteJokes() {
  const jokeStore = useJokeStore();
  const favoriteJokes = computed(() => jokeStore.jokeCollection);

  function addFavoriteJoke(joke: Joke) {
    const jokeAsFavorite = { ...joke, rating: 0 };
    jokeStore.addJokeToCollectionOnStore(jokeAsFavorite);
  }

  function removeFavoriteJoke(jokeId: number) {
    jokeStore.removeJokeFromCollectionOnStore(jokeId);
  }

  function isJokeFavorite(jokeId: number): boolean {
    return favoriteJokes.value.some((joke) => joke.id === jokeId);
  }

  return {
    favoriteJokes,
    addFavoriteJoke,
    removeFavoriteJoke,
    isJokeFavorite,
  };
}
