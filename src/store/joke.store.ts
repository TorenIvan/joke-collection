import { defineStore } from 'pinia';
import type { FavoriteJoke } from '../types';
import { isNullish } from '../helpers/isNullish.helper';

export const useJokeStore = defineStore('jokeStore', {
  state: () => ({
    jokeCollection:
      isNullish(localStorage.getItem('jokeCollection')) === false
        ? (JSON.parse(localStorage.getItem('jokeCollection')!) as Array<FavoriteJoke>)
        : [],
  }),
  actions: {
    addJokeToCollectionOnStore(joke: FavoriteJoke) {
      this.jokeCollection.push(joke);
      this.updateLocalStorage();
    },
    removeJokeFromCollectionOnStore(jokeId: number) {
      this.jokeCollection = this.jokeCollection.filter((joke) => joke.id !== jokeId);
      this.updateLocalStorage();
    },
    updateJokeRatingToCollectionOnStore(jokeId: number, rating: number) {
      this.jokeCollection = this.jokeCollection.map((joke) =>
        joke.id === jokeId ? { ...joke, rating: rating } : joke
      );
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem('jokeCollection', JSON.stringify(this.jokeCollection));
    },
  },
});
