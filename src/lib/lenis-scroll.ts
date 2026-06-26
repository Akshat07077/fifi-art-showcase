import type Lenis from "lenis";

/** Matches `scroll-mt-28` on anchored sections. */
export const HEADER_SCROLL_OFFSET = -112;

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function scrollToAnchor(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: HEADER_SCROLL_OFFSET, duration: 1.1 });
    return;
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function pauseLenis() {
  lenis?.stop();
}

export function resumeLenis() {
  lenis?.start();
}
