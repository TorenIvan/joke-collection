<template>
  <section class="flex mb-4 gap-4 justify-center">
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
import { useI18n } from 'vue-i18n';
import Tab from './components/Tab.vue';
import { TabType } from './types';
import { ref } from 'vue';

const { t } = useI18n();

const activeTab = ref<keyof typeof TabType | undefined>(undefined);

function setActiveTab(tab: keyof typeof TabType) {
  activeTab.value = tab;
}
</script>
