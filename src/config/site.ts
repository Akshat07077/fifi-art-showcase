import { artistContent, GALLERY_CATEGORIES, type GalleryItemConfig } from "./presets";
import { getAsset, getAssets } from "./assets.registry";
import * as env from "@/lib/site-config";

export type ResolvedWork = GalleryItemConfig & { src: string };

function heroEyebrow() {
  return `${env.STUDIO_CITY} · ${env.STUDIO_TAGLINE}`;
}

function locationShort() {
  return `${env.STUDIO_STREET}`;
}

function footerLocationLine() {
  return `${env.STUDIO_STREET}, ${env.STUDIO_CITY}`;
}

function mobileMenuTagline() {
  return `${env.STUDIO_CITY} · ${env.APPOINTMENT_LABEL}`;
}

/** Single source of truth consumed by the landing page. */
export const site = {
  env,
  categories: GALLERY_CATEGORIES,
  content: artistContent,

  brand: {
    name: env.STUDIO_NAME,
    artistName: env.ARTIST_NAME,
    legalName: env.STUDIO_LEGAL_NAME,
    tagline: env.STUDIO_TAGLINE,
  },

  seo: {
    title: `${env.STUDIO_NAME} — ${artistContent.seo.titleSuffix}`,
    description: env.SITE_DESCRIPTION,
    ogImage: getAsset(artistContent.images.og),
  },

  hero: {
    ...artistContent.hero,
    eyebrow: heroEyebrow(),
    locationTag: `${env.STUDIO_NAME} · ${locationShort()}`,
    portrait: getAsset(artistContent.hero.images.portrait),
    accents: getAssets(artistContent.hero.images.accents),
    strip: getAssets(artistContent.hero.images.strip),
    headline: `${artistContent.hero.headlineBefore} of ${artistContent.hero.headlineItalic}.`,
  },

  works: artistContent.gallery.items.map((item) => ({
    ...item,
    src: getAsset(item.image),
  })) as ResolvedWork[],

  about: {
    ...artistContent.about,
    heading: `${env.ARTIST_NAME}.`,
    portrait: getAsset(artistContent.about.images.portrait),
    portraitAlt: `${env.ARTIST_NAME}, ${artistContent.about.portraitAlt}`,
  },

  instagram: {
    ...artistContent.instagram,
    grid: getAssets(artistContent.instagram.grid),
  },

  booking: {
    ...artistContent.booking,
    description: artistContent.booking.description,
    contacts: artistContent.booking.contacts.map((c) => {
      if (c.type === "whatsapp") return { ...c, href: env.WHATSAPP_URL };
      if (c.type === "instagram")
        return { ...c, href: env.INSTAGRAM_URL, label: env.INSTAGRAM_LABEL };
      return { ...c, href: env.STUDIO_EMAIL_URL, label: env.STUDIO_EMAIL };
    }),
  },

  footer: {
    ...artistContent.footer,
    blurb: `${artistContent.footer.blurb} in ${footerLocationLine()}.`,
    hours: `${env.STUDIO_HOURS_DAYS} · ${env.STUDIO_HOURS_TIME}`,
    copyright: `© ${new Date().getFullYear()} ${env.STUDIO_LEGAL_NAME}`,
    crafted: `Crafted in ${env.STUDIO_CITY} · ${artistContent.footer.craftedNote}`,
  },

  ui: {
    mobileMenuTagline: mobileMenuTagline(),
    appointmentSuffix: env.APPOINTMENT_LABEL,
  },
} as const;

export type SiteConfig = typeof site;
