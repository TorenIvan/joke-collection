/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_JOKE_COUNT: number;
  readonly VITE_APP_JOKE_COUNT_STRING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
