import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './locales/i18n';
import App from './App.vue';
import './style.css';

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.mount('#app');
