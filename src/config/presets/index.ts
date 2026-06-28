import { artistContent as fifiContent, GALLERY_CATEGORIES } from "../artist.content";
import { inknovaContent } from "./inknova.content";

export { GALLERY_CATEGORIES };
export type { GalleryItemConfig } from "../artist.content";

export const CONTENT_PRESETS = {
  fifi: fifiContent,
  inknova: inknovaContent,
  /** @deprecated use inknova */
  dummy: inknovaContent,
} as const;

export type ContentPresetId = "fifi" | "inknova";

function presetFromEnv(): ContentPresetId {
  const raw = import.meta.env.VITE_CONTENT_PRESET;
  if (raw === "inknova" || raw === "dummy") return "inknova";
  return "fifi";
}

export const activePresetId = presetFromEnv();

/** Active artist copy — switched via VITE_CONTENT_PRESET in .env */
export const artistContent =
  activePresetId === "inknova" ? inknovaContent : fifiContent;
