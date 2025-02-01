<template>
  <section class="flex mb-4 gap-4 justify-center">
    <button
      class="absolute top-4 right-4 p-2 border rounded-md text-white font-bold transition-all duration-300 ease-in-out bg-spotify-dark border-spotify-gray hover:bg-spotify-green hover:text-black focus:outline-none focus:ring-2 focus:ring-spotify-green active:scale-95"
      @click="toggleLanguage"
    >
      {{ currentLanguage === Language.en ? Language.el.toUpperCase() : Language.en.toUpperCase() }}
    </button>
    <Tab
      :title="t('tabs.all')"
      :isActive="activeTab === TabType.All"
      @click="setActiveTab(TabType.All)"
    />
    <Tab
      :title="t('tabs.favorites')"
      :isActive="activeTab === TabType.Favorites"
      @click="setActiveTab(TabType.Favorites)"
    />
    <Tab
      :title="t('tabs.programming')"
      :isActive="activeTab === TabType.Programming"
      @click="setActiveTab(TabType.Programming)"
    />
    <Tab
      :title="t('tabs.dad')"
      :isActive="activeTab === TabType.Dad"
      @click="setActiveTab(TabType.Dad)"
    />
    <Tab
      :title="t('tabs.knock-knock')"
      :isActive="activeTab === TabType.KnockKnock"
      @click="setActiveTab(TabType.KnockKnock)"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Tab from './components/Tab.component.vue';
import { Language, TabType } from './types';
import { useLanguage } from './composables/useLanguage.composable';

const { t } = useI18n();
const activeTab = ref<keyof typeof TabType | undefined>(undefined);
const { currentLanguage, toggleLanguage } = useLanguage();

console.log({ currentLanguage });

function setActiveTab(tab: keyof typeof TabType) {
  activeTab.value = tab;
}
</script>
