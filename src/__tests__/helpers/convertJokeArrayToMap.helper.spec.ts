import { expect, describe, it } from 'vitest';
import { convertJokeArrayToMap } from '../../helpers/convertJokeArrayToMap.helper';
import type { FavoriteJoke, Joke } from '../../types';

describe('convertJokeArrayToMap function', () => {
  it('should return a Map when given undefined', () => {
    expect(convertJokeArrayToMap(undefined)).toBeInstanceOf(Map);
  });

  it('should return a Map when given an empty array', () => {
    expect(convertJokeArrayToMap([])).toBeInstanceOf(Map);
  });

  it('should return an empty Map when given undefined', () => {
    expect(convertJokeArrayToMap(undefined).size).toBe(0);
  });

  it('should return an empty Map when given an empty array', () => {
    expect(convertJokeArrayToMap([]).size).toBe(0);
  });

  it('should correctly convert an array of FavoriteJoke objects to a Map', () => {
    const jokes: FavoriteJoke[] = [
      {
        id: 1,
        type: 'programming',
        setup: 'Why do programmers prefer dark mode?',
        punchline: 'Because light attracts bugs.',
        rating: 5,
      },
      {
        id: 2,
        type: 'general',
        setup: 'What do you call fake spaghetti?',
        punchline: 'An impasta!',
        rating: 4,
      },
    ];

    const jokeMap = convertJokeArrayToMap(jokes);

    expect(jokeMap).toBeInstanceOf(Map);
    expect(jokeMap.size).toBe(2);
    expect(jokeMap.get(1)).toEqual(jokes[0]);
    expect(jokeMap.get(2)).toEqual(jokes[1]);
  });

  it('should correctly handle a mix of FavoriteJoke and Joke objects', () => {
    const mixedJokes: Array<Joke | FavoriteJoke> = [
      {
        id: 1,
        type: 'programming',
        setup: 'Why do Java developers wear glasses?',
        punchline: 'Because they don’t C#.',
        rating: 5,
      },
      {
        id: 2,
        type: 'general',
        setup: 'Why was the math book sad?',
        punchline: 'It had too many problems.',
      },
    ];

    const jokeMap = convertJokeArrayToMap(mixedJokes);

    expect(jokeMap).toBeInstanceOf(Map);
    expect(jokeMap.size).toBe(2);
    expect(jokeMap.get(1)).toEqual(mixedJokes[0]);
    expect(jokeMap.get(2)).toEqual(mixedJokes[1]);
  });
});
