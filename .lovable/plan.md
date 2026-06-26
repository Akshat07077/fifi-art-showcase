
# Fifi Poke — Editorial Landing Page

Build the selected "Atelier Exhibition" direction as a single-page landing site for Fifi Poke, Delhi handpoke & machine tattoo artist. Editorial-luxury, off-white canvas, Cormorant Garamond serif paired with Inter, generous whitespace, sticky vertical section index.

Note on stack: the brief asked for Next.js 15, but this project is TanStack Start (React 19 + Vite). I'll build it on the existing stack with the same UX intent — Framer Motion for subtle reveals and Lenis for smooth scroll. If you specifically need Next.js, tell me and I'll flag the migration as a separate effort.

## Sections (in order)

1. Sticky vertical nav index (left rail, xl+)
2. Hero — eyebrow, oversized serif headline "The silent dialogue of needle and skin.", primary "Book Your Session" CTA + "View Archive" link, studio-detail image at right
3. Selected Impressions — masonry gallery, category filter chips (All / Handpoke / Machine / Flash / Piercings), click to open refined lightbox
4. The Four Stages of Synthesis — process (Consultation → Design → Session → Aftercare) as sticky-title + typographic ladder
5. The Practitioner — artist story, philosophy, portrait, stat row
6. Testimonials — editorial pull-quotes, gentle fade-in on scroll
7. FAQ — accordion (appointments, pain, handpoke vs machine, pricing, healing, hygiene)
8. From the Studio — Instagram grid (8 tiles) + link to @fifipoke
9. Booking — WhatsApp / Instagram DM / Email cards
10. Footer — address, hours, legal links

## Visual system

- Tokens in `src/styles.css` via `@theme`: `--color-canvas #fafafa`, `--color-ink #18181b`, `--color-paper #f4f4f5`, `--font-serif Cormorant Garamond`, `--font-sans Inter`.
- Fonts loaded via `<link>` in `src/routes/__root.tsx` head (Tailwind v4 + remote fonts rule).
- Reuse shadcn Button/Accordion/Dialog primitives, restyled to the editorial language (pill CTA, hairline rings, no default radius noise).

## Motion

- Lenis smooth scroll initialized once in `__root.tsx`.
- Framer Motion: `whileInView` fade-and-rise (y: 16 → 0, 600ms ease-out) on section headers, gallery tile clip-path reveal, hover scale 1.02 on tiles. Respect `prefers-reduced-motion`.

## Imagery

All hero/gallery/portrait/IG/studio images generated via `imagegen` (premium where text-adjacent, fast otherwise) and saved under `src/assets/`. Prompts derived from the prototype's `data-lov-image-placeholder` blocks: needle dipping into ink well, fine-line floral handpoke on wrist, butterfly stippling macro, geometric spine piece, artist portrait in minimalist studio, plus 8 IG-square tattoo details.

## Technical plan

- Replace placeholder `src/routes/index.tsx` with the full landing composition, broken into small components under `src/components/landing/`: `Nav`, `Hero`, `Gallery`, `Process`, `Artist`, `Testimonials`, `Faq`, `Instagram`, `Booking`, `Footer`, plus `Lightbox` (shadcn Dialog).
- Gallery state: local `useState<Category>` filter + `useState<Image | null>` for lightbox.
- Add deps: `bun add framer-motion lenis`.
- Head metadata via `head()` in `src/routes/index.tsx`: title "Fifi Poke — Handpoke & Machine Tattoo Studio, Delhi", meta description (<160ch), `og:title`, `og:description`, `og:type=website`, `og:url=/`, canonical `/`. Root keeps sitewide defaults only.
- JSON-LD `LocalBusiness` (TattooParlor) script in index route head with name, address (Hauz Khas Village, New Delhi), sameAs Instagram URL.
- Accessibility: single `<main>` in `__root.tsx` outlet wrapper, semantic landmarks, alt text on every image, icon-only buttons get `aria-label`, focus-visible rings.
- SEO: one H1 (hero), descriptive H2 per section, lazy-load below-the-fold images, responsive `srcset` via Vite asset pipeline.

## Out of scope (call out if needed)

- Real Instagram API integration — using a curated static grid that links to the profile. Real-time IG embed can be added later via Instagram Basic Display API or a service like Behold.
- Booking backend — CTAs deep-link to WhatsApp (`wa.me`), Instagram DM, and `mailto:`. No DB/auth needed. If you want stored bookings, that's a Lovable Cloud follow-up.
- Confirm: WhatsApp number, email address, exact studio address, Instagram handle. I'll ship with placeholder contact details (Hauz Khas Village, `@fifipoke`, `studio@fifipoke.art`) and you can swap them in one pass.
