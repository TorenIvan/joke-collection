import { createI18n } from 'vue-i18n';

import en from './en.json';
import el from './el.json';

const i18n = createI18n({
  locale: 'en',
  messages: {
    en,
    el,
  },
});

export default i18n;
