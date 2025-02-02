export const TabType = {
  All: 'All',
  Programming: 'Programming',
  KnockKnock: 'KnockKnock',
  Dad: 'Dad',
  Favorites: 'Favorites',
} as const;

export const Language = {
  en: 'en',
  el: 'el',
} as const;

export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export interface FavoriteJoke extends Joke {
  rating: number;
}

export type SortType = 'asc' | 'desc' | undefined;
