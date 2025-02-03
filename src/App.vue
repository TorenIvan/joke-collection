<template>
  <button
    class="absolute mb-6 top-4 right-4 p-2 hover:cursor-pointer border rounded-md text-white font-bold transition-all duration-300 ease-in-out bg-spotify-dark border-spotify-gray hover:bg-spotify-green hover:text-black focus:outline-none focus:ring-2 focus:ring-spotify-green active:scale-95"
    @click="toggleLanguage"
  >
    {{ currentLanguage === Language.en ? Language.el.toUpperCase() : Language.en.toUpperCase() }}
  </button>
  <div class="flex flex-col gap-8 justify-center max-w-2xl mx-auto px-4 mt-5">
    <h1 class="text-3xl font-bold text-center text-white mt-4">
      {{ t('jokes.appName') }}: <span class="text-spotify-green">{{ t('jokes.title') }}</span> 😂
    </h1>
    <section class="relative mb-4 gap-4 justify-center md:flex md:flex-wrap">
      <div class="flex flex-wrap gap-4 justify-center w-full">
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
      </div>
    </section>
    <section class="flex mb-4 gap-4 justify-center md:flex-row flex-wrap">
      <ul class="list bg-spotify-dark rounded-box shadow-md w-full md:w-auto">
        <AllJokesComponent :isVisible="activeTab === TabType.All" @onOpenJoke="openPunchline" />
        <DadJokesComponent :isVisible="activeTab === TabType.Dad" @onOpenJoke="openPunchline" />
        <FavoriteJokesComponent
          :isVisible="activeTab === TabType.Favorites"
          @onOpenJoke="openPunchline"
        />
        <ProgrammingJokesComponent
          :isVisible="activeTab === TabType.Programming"
          @onOpenJoke="openPunchline"
        />
        <KnockKnockJokesComponent
          :isVisible="activeTab === TabType.KnockKnock"
          @onOpenJoke="openPunchline"
        />
      </ul>
    </section>
    <dialog
      id="punchline-modal"
      class="modal modal-bottom sm:modal-middle opacity-0 scale-95 transition-all duration-300 ease-in-out"
    >
      <div
        class="modal-box text-color-spotify-lightgray border border-color-spotify-gray shadow-lg rounded-lg relative bg-spotify-dark"
      >
        <button
          v-if="jokeToShow !== undefined"
          class="btn btn-square btn-ghost absolute top-4 right-4"
          @click="toggleFavoriteHandler()"
        >
          <HeartIconComponent :is-favorite="true" v-if="isJokeFavorite(jokeToShow.id)" />
          <HeartIconComponent :is-favorite="false" v-if="!isJokeFavorite(jokeToShow.id)" />
        </button>
        <p class="py-4 text-lg text-center font-semibold text-white">
          {{ jokeToShow?.punchline }}
        </p>

        <div class="modal-action justify-center">
          <form method="dialog">
            <button
              class="btn bg-color-spotify-green hover:bg-green-600 text-white px-5 py-2 rounded-md transition duration-200 bg-green-500"
              @click="handleCloseModal"
            >
              {{ t('jokes.close') }}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Tab from './components/Tab.component.vue';
import { Language, TabType, type Joke } from './types';
import { useLanguage } from './composables/useLanguage.composable';
import AllJokesComponent from './components/AllJokes.component.vue';
import DadJokesComponent from './components/DadJokes.component.vue';
import ProgrammingJokesComponent from './components/ProgrammingJokes.component.vue';
import KnockKnockJokesComponent from './components/KnockKnockJokes.component.vue';
import FavoriteJokesComponent from './components/FavoriteJokes.component.vue';
import { useFavoriteJokes } from './composables/useFavoriteJokes.composable';
import HeartIconComponent from './components/HeartIcon.component.vue';

const { t } = useI18n();
const activeTab = ref<keyof typeof TabType | undefined>(TabType.All);
const { currentLanguage, toggleLanguage } = useLanguage();
const { isJokeFavorite, addFavoriteJoke, removeFavoriteJoke } = useFavoriteJokes();
const jokeToShow = ref<Joke | undefined>();

function setActiveTab(tab: keyof typeof TabType) {
  activeTab.value = tab;
}

function openPunchline(joke: Joke) {
  jokeToShow.value = joke;
  const modal = document.getElementById('punchline-modal') as HTMLDialogElement;
  if (modal) {
    modal.classList.remove('opacity-0', 'scale-95');
    modal.classList.add('opacity-100', 'scale-100');
    modal.showModal();
  }
}

function handleCloseModal() {
  const modal = document.getElementById('punchline-modal') as HTMLDialogElement;
  if (modal) {
    modal.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
      modal.close();
      jokeToShow.value = undefined;
    }, 200);
  }
}

function toggleFavoriteHandler() {
  if (jokeToShow.value === undefined) {
    return;
  }
  if (isJokeFavorite(jokeToShow.value.id)) {
    removeFavoriteJoke(jokeToShow.value.id);
  } else {
    addFavoriteJoke(jokeToShow.value);
  }
}
</script>
