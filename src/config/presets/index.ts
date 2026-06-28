import { artistContent as fifiContent, GALLERY_CATEGORIES } from "../artist.content";
import { dummyContent } from "./dummy.content";

export { GALLERY_CATEGORIES };
export type { GalleryItemConfig } from "../artist.content";

export const CONTENT_PRESETS = {
  fifi: fifiContent,
  dummy: dummyContent,
} as const;

export type ContentPresetId = keyof typeof CONTENT_PRESETS;

function presetFromEnv(): ContentPresetId {
  const raw = import.meta.env.VITE_CONTENT_PRESET;
  if (raw === "dummy") return "dummy";
  return "fifi";
}

export const activePresetId = presetFromEnv();

/** Active artist copy — switched via VITE_CONTENT_PRESET in .env */
export const artistContent = CONTENT_PRESETS[activePresetId];
