import { createI18n } from 'vue-i18n';

import en from './en.json';
import el from './el.json';
import { Language } from '../types';
import { isNullish } from '../helpers/isNullish.helper';

const i18n = createI18n({
  locale: getCurrentLanguage(),
  fallbackLanguage: getCurrentLanguage(),
  messages: {
    en,
    el,
  },
  legacy: false,
});

function getCurrentLanguage() {
  return isNullish(localStorage.getItem('language')) === false
    ? JSON.parse(localStorage.getItem('language')!)
    : Language.en;
}

export default i18n;
