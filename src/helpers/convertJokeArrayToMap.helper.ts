import type { FavoriteJoke } from '../types';

export function convertJokeArrayToMap(
  jokes: Array<FavoriteJoke> | undefined
): Map<number, FavoriteJoke> {
  const jokeMap = ((jokes ?? []) as Array<FavoriteJoke>).reduce(
    (accumulator: Map<number, FavoriteJoke>, currentJoke: FavoriteJoke) => {
      accumulator.set(currentJoke.id, currentJoke);
      return accumulator;
    },
    new Map()
  );
  return jokeMap;
}
