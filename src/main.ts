import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import { VueQueryPlugin } from '@tanstack/vue-query';
import i18n from './locales/i18n';
import App from './App.vue';
import './style.css';
import 'vue3-toastify/dist/index.css';

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.use(VueQueryPlugin);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'bottom-right',
} as ToastContainerOptions);
app.mount('#app');
