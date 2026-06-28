/**
 * Image registry — swap files in src/assets/ or add imports here when rebranding.
 * Config references these keys (e.g. "heroPortrait"), not file paths.
 */
import heroNeedle from "@/assets/hero-needle.jpg";
import heroPortrait from "@/assets/IMG_4406.avif";
import artistAbout from "@/assets/0b2b8f_d91a39145cfb4403844281fe5aabe327~mv2.avif";
import workFloral from "@/assets/work-floral.png";
import workKnight from "@/assets/work-knight.png";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";

export const assetRegistry = {
  heroNeedle,
  heroPortrait,
  artistAbout,
  workFloral,
  workKnight,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  ig3,
  ig4,
} as const;

export type AssetKey = keyof typeof assetRegistry;

export function getAsset(key: AssetKey): string {
  return assetRegistry[key];
}

export function getAssets(keys: AssetKey[]): string[] {
  return keys.map(getAsset);
}
