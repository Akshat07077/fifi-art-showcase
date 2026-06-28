/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTENT_PRESET: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_STUDIO_NAME: string;
  readonly VITE_ARTIST_NAME: string;
  readonly VITE_STUDIO_LEGAL_NAME: string;
  readonly VITE_STUDIO_TAGLINE: string;
  readonly VITE_SITE_DESCRIPTION: string;
  readonly VITE_INSTAGRAM_HANDLE: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_STUDIO_EMAIL: string;
  readonly VITE_STUDIO_STREET: string;
  readonly VITE_STUDIO_CITY: string;
  readonly VITE_STUDIO_POSTAL_CODE: string;
  readonly VITE_STUDIO_COUNTRY: string;
  readonly VITE_STUDIO_HOURS_DAYS: string;
  readonly VITE_STUDIO_HOURS_TIME: string;
  readonly VITE_APPOINTMENT_LABEL: string;
  readonly VITE_PRICE_RANGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
