/// <reference types="vite/client" />

declare module 'vue-fullpage.js';

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
