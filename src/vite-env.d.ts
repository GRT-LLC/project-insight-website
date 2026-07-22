/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Pexels API key for section/hero photography. Optional; when unset,
   *  photo lookups return nothing and bands render their designed fallback. */
  readonly VITE_PEXELS_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
