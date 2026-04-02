/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Injected in `vite.config.ts` from `NEXT_PUBLIC_DOMAIN_NAME` in `playground/.env`. */
  readonly NEXT_PUBLIC_DOMAIN_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
