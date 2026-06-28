import type { AssetKey } from "./assets.registry";

/** Gallery filter categories — add or remove to match the artist's services. */
export const GALLERY_CATEGORIES = ["All", "Handpoke", "Machine", "Flash", "Piercings"] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
export type WorkCategory = Exclude<GalleryCategory, "All">;

export type GalleryItemConfig = {
  id: string;
  image: AssetKey;
  alt: string;
  title: string;
  category: WorkCategory;
  meta: string;
  ratio: string;
};

/**
 * All editable copy & content for one artist.
 * Duplicate this POC: edit this file + .env + swap images in assets.registry.ts
 */
export const artistContent = {
  seo: {
    titleSuffix: "Handpoke & Machine Tattoo Studio, Delhi",
  },

  nav: [
    { href: "#works", label: "Gallery" },
    { href: "#ritual", label: "Process" },
    { href: "#artist", label: "Artist" },
    { href: "#faq", label: "FAQ" },
    { href: "#booking", label: "Book" },
  ] as const,

  sideNav: [
    { href: "#works", label: "01 · Gallery" },
    { href: "#ritual", label: "02 · Process" },
    { href: "#artist", label: "03 · Artist" },
    { href: "#booking", label: "04 · Booking" },
  ] as const,

  hero: {
    images: {
      portrait: "heroPortrait" as AssetKey,
      accents: ["workFloral", "workKnight"] as AssetKey[],
      strip: ["workFloral", "workKnight", "heroNeedle"] as AssetKey[],
    },
    portraitAlt: "Handpoke tattoo artist in studio",
    accentAlts: ["Fine-line floral tattoo detail", "Illustrative tattoo detail"],
    headlineBefore: "The silent dialogue",
    headlineItalic: "needle and skin",
    primaryCta: "Book Your Session",
    secondaryCta: "View the archive",
  },

  gallery: {
    eyebrow: "01 · Selected Impressions",
    title: "A quiet archive of permanent marks.",
    items: [
      {
        id: "w1",
        image: "workFloral",
        alt: "Fine-line floral tattoo on upper arm",
        title: "Botanical Stem",
        category: "Handpoke",
        meta: "Upper arm · fine line",
        ratio: "aspect-[4/5]",
      },
      {
        id: "w2",
        image: "workKnight",
        alt: "Illustrative knight with sword tattoo on upper arm",
        title: "The Knight",
        category: "Handpoke",
        meta: "Upper arm · dotwork",
        ratio: "aspect-[4/5]",
      },
      {
        id: "w3",
        image: "gallery3",
        alt: "Minimal geometric line tattoo on forearm",
        title: "Acute",
        category: "Machine",
        meta: "Forearm · 1h",
        ratio: "aspect-[5/8]",
      },
      {
        id: "w4",
        image: "gallery4",
        alt: "Fine-line snake tattoo wrapping the ankle",
        title: "Ouroboros",
        category: "Handpoke",
        meta: "Ankle · 3h",
        ratio: "aspect-[4/5]",
      },
      {
        id: "w5",
        image: "gallery5",
        alt: "Hand-drawn flash tattoo sheet on cream paper",
        title: "Flash Sheet 03",
        category: "Flash",
        meta: "Available designs",
        ratio: "aspect-[4/3]",
      },
      {
        id: "w6",
        image: "gallery6",
        alt: "Elegant ear piercing with gold hoop and stud",
        title: "Lobe + Helix",
        category: "Piercings",
        meta: "14k gold",
        ratio: "aspect-[4/5]",
      },
    ] satisfies GalleryItemConfig[],
  },

  process: {
    eyebrow: "02 · The Method",
    title: "Four stages of synthesis.",
    titleItalic: "synthesis",
    steps: [
      {
        no: "01. Intention",
        title: "The Consultation",
        body: "Every mark begins as a conversation. We discuss your vision, placement, and the narrative behind the design to ensure the final piece resonates with your individual story.",
      },
      {
        no: "02. Manifestation",
        title: "The Design",
        body: "Custom sketches are developed with a focus on anatomy and flow. Whether it's a flash piece or a bespoke commission, the drawing is refined until it feels correct.",
      },
      {
        no: "03. Impression",
        title: "The Session",
        body: "A quiet, meditative environment in the studio. Handpoke is slower and ritualistic; machine work offers precision and depth. Both held to clinical hygiene standards.",
      },
      {
        no: "04. Preservation",
        title: "Aftercare",
        body: "Healing is as critical as the application. You leave with a curated aftercare kit and clear instructions so your tattoo heals with crisp clarity and longevity.",
      },
    ],
  },

  about: {
    eyebrow: "03 · The Practitioner",
    images: { portrait: "artistAbout" as AssetKey },
    portraitAlt: "Full portrait of the artist",
    bio: [
      "Based in the heart of the city, my practice is rooted in the belief that a tattoo is more than pigment — it is a transformation of the self. I specialise in the slow, intentional art of handpoke, with a careful machine practice for pieces that ask for it.",
      "My studio is a sanctuary designed for focus and calm, away from the bustle of commercial shops. Here, craftsmanship meets mindfulness — every session is a single conversation, never a queue.",
    ],
    stats: [
      { value: "6", suffix: "+", label: "Years of Practice" },
      { value: "1.2k", suffix: "+", label: "Marks Made" },
      { value: "∞", suffix: "", label: "Cups of Chai" },
    ],
  },

  testimonials: {
    eyebrow: "Client Echoes",
    items: [
      {
        quote:
          "The studio feels more like a gallery than a tattoo shop. The handpoke process was meditative — I left with a piece I am proud to wear forever.",
        name: "Ananya S.",
        place: "Delhi",
      },
      {
        quote:
          "She took the time to understand the story behind the design. The line work is impossibly fine and has healed beautifully.",
        name: "Ishaan R.",
        place: "Mumbai",
      },
      {
        quote:
          "Calm hands, careful eye, immaculate hygiene. The most considered tattoo experience I've had anywhere.",
        name: "Mira K.",
        place: "Bengaluru",
      },
    ],
  },

  faq: {
    eyebrow: "04 · Notes",
    title: "Things people often ask.",
    titleItalic: "often",
    items: [
      {
        q: "How do I book an appointment?",
        a: "Reach out via WhatsApp, Instagram DM, or email with a short description of your idea, placement, and approximate size. A deposit confirms your slot once the design is approved.",
      },
      {
        q: "Does it hurt?",
        a: "Handpoke is generally gentler than machine work because there is no vibration. Sensation depends on placement and your own tolerance — I'll guide you through pacing and breaks.",
      },
      {
        q: "Handpoke or machine — which should I choose?",
        a: "Handpoke suits delicate, organic compositions and heals with a soft, lived-in texture. Machine work gives crisp saturation and is better for denser or larger pieces. We'll decide together.",
      },
      {
        q: "How is pricing determined?",
        a: "Pricing is based on size, complexity, placement, and time. Small flash pieces start at a flat rate; custom work is quoted after consultation. A non-refundable deposit secures the booking.",
      },
      {
        q: "What about healing?",
        a: "Full healing takes 2–4 weeks. You'll receive a curated aftercare kit and written instructions. Avoid sun, swimming, and friction during the first two weeks.",
      },
      {
        q: "What hygiene standards do you follow?",
        a: "Single-use, sterile needles and ink caps; medical-grade barrier film; hospital-grade surface disinfection between every client. All sharps are disposed of in regulated containers.",
      },
    ],
  },

  instagram: {
    eyebrow: "From the Studio",
    title: "Latest on Instagram.",
    grid: ["workFloral", "workKnight", "heroPortrait", "ig3", "ig4", "gallery3", "gallery4", "gallery6"] as AssetKey[],
  },

  booking: {
    eyebrow: "05 · Booking",
    title: "Commence a new narrative.",
    titleItalic: "narrative",
    description:
      "Currently accepting inquiries for custom projects, flash, and small piercings. Choose your preferred channel — I usually reply within a day.",
    contacts: [
      { type: "whatsapp" as const, eyebrow: "WhatsApp", label: "Direct message" },
      { type: "instagram" as const, eyebrow: "Instagram", label: "" },
      { type: "email" as const, eyebrow: "Email", label: "" },
    ],
  },

  footer: {
    blurb: "A boutique handpoke and machine tattoo studio.",
    appointmentNote: "By appointment only",
    craftedNote: "By appointment",
  },

  images: {
    og: "heroNeedle" as AssetKey,
  },
};

export type ArtistContent = typeof artistContent;
