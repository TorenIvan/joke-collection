import { defineStore } from 'pinia';
import { Language } from '../types';
import { isNullish } from '../helpers/isNullish.helper';

export const useLanguageStore = defineStore('languageStore', {
  state: () => ({
    language:
      isNullish(localStorage.getItem('language')) === false
        ? JSON.parse(localStorage.getItem('language')!)
        : Language.en,
  }),
  actions: {
    toggleLanguageOnStore(language: keyof typeof Language) {
      this.language = language;
      localStorage.setItem('language', JSON.stringify(language));
    },
  },
});
