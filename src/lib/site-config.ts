function env(key: keyof ImportMetaEnv, fallback: string) {
  const value = import.meta.env[key];
  return value && value.length > 0 ? value : fallback;
}

export const SITE_URL = env("VITE_SITE_URL", "http://localhost:5173");

export const STUDIO_NAME = env("VITE_STUDIO_NAME", "Fifi Poke");
export const ARTIST_NAME = env("VITE_ARTIST_NAME", "Fifi");
export const STUDIO_LEGAL_NAME = env("VITE_STUDIO_LEGAL_NAME", "Fifi Poke Studio");
export const STUDIO_TAGLINE = env("VITE_STUDIO_TAGLINE", "Handpoke & Machine");
export const SITE_DESCRIPTION = env(
  "VITE_SITE_DESCRIPTION",
  "Boutique tattoo studio. Custom handpoke tattoos, fine-line machine work, flash designs and piercings — by appointment.",
);

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

export const STUDIO_HOURS_DAYS = env("VITE_STUDIO_HOURS_DAYS", "Tue — Sat");
export const STUDIO_HOURS_TIME = env("VITE_STUDIO_HOURS_TIME", "11:00 – 19:00");
export const APPOINTMENT_LABEL = env("VITE_APPOINTMENT_LABEL", "By Appointment");
export const PRICE_RANGE = env("VITE_PRICE_RANGE", "₹₹");
