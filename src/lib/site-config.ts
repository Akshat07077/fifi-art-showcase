function env(key: keyof ImportMetaEnv, fallback: string) {
  const value = import.meta.env[key];
  return value && value.length > 0 ? value : fallback;
}

export const SITE_URL = env("VITE_SITE_URL", "http://localhost:5173");

export const INSTAGRAM_HANDLE = env("VITE_INSTAGRAM_HANDLE", "fifipoke");
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
export const INSTAGRAM_LABEL = `@${INSTAGRAM_HANDLE}`;

const whatsappDigits = env("VITE_WHATSAPP_NUMBER", "919999999999").replace(/\D/g, "");
export const WHATSAPP_URL = `https://wa.me/${whatsappDigits}`;

export const STUDIO_EMAIL = env("VITE_STUDIO_EMAIL", "studio@fifipoke.art");
export const STUDIO_EMAIL_URL = `mailto:${STUDIO_EMAIL}`;

export const STUDIO_STREET = env("VITE_STUDIO_STREET", "Hauz Khas Village");
export const STUDIO_CITY = env("VITE_STUDIO_CITY", "New Delhi");
export const STUDIO_POSTAL_CODE = env("VITE_STUDIO_POSTAL_CODE", "110016");
export const STUDIO_COUNTRY = env("VITE_STUDIO_COUNTRY", "IN");
