import type { FavoriteJoke, Joke } from '../types';

export function convertJokeArrayToMap(
  jokes: Array<FavoriteJoke | Joke> | undefined
): Map<number, FavoriteJoke> {
  const jokeMap = ((jokes ?? []) as Array<FavoriteJoke | Joke>).reduce(
    (accumulator: Map<number, FavoriteJoke | Joke>, currentJoke: FavoriteJoke | Joke) => {
      accumulator.set(currentJoke.id, currentJoke);
      return accumulator;
    },
    new Map()
  );
  return jokeMap;
}
