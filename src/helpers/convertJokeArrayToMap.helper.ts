import type { Joke } from '../types';

export function convertJokeArrayToMap(jokes: Array<Joke> | undefined): Map<number, Joke> {
  const jokeMap = ((jokes ?? []) as Array<Joke>).reduce(
    (accumulator: Map<number, Joke>, currentJoke: Joke) => {
      accumulator.set(currentJoke.id, currentJoke);
      return accumulator;
    },
    new Map()
  );
  return jokeMap;
}
