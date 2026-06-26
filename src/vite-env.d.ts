/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string;
  readonly VITE_INSTAGRAM_HANDLE: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_STUDIO_EMAIL: string;
  readonly VITE_STUDIO_STREET: string;
  readonly VITE_STUDIO_CITY: string;
  readonly VITE_STUDIO_POSTAL_CODE: string;
  readonly VITE_STUDIO_COUNTRY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
