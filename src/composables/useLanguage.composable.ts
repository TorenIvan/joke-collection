import { Language } from '../types';
import { useLanguageStore } from '../store/language.store';
import i18n from '../locales/i18n';
import { computed } from 'vue';

export function useLanguage() {
  const languageStore = useLanguageStore();
  const currentLanguage = computed(() => languageStore.language);

  function toggleLanguage() {
    const newLanguage = languageStore.language === Language.en ? Language.el : Language.en;
    i18n.global.locale.value = newLanguage;
    languageStore.toggleLanguageOnStore(newLanguage);
  }

  return {
    currentLanguage,
    toggleLanguage,
  };
}
