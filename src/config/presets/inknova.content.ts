import type { ArtistContent } from "../artist.content";
import type { AssetKey } from "../assets.registry";

/** Ink Nova (Luna) — Mumbai fine-line studio */
export const inknovaContent = {
  seo: {
    titleSuffix: "Fine-Line Tattoo Studio, Mumbai",
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
      portrait: "novaHero" as AssetKey,
      accents: ["novaAccentA", "novaAccentB"] as AssetKey[],
      strip: ["novaAccentA", "novaAccentB", "gallery5"] as AssetKey[],
    },
    portraitAlt: "Luna, fine-line tattoo artist in Mumbai studio",
    accentAlts: ["Geometric fine-line tattoo", "Blackwork snake tattoo"],
    headlineBefore: "Lines that listen",
    headlineItalic: "before they linger",
    primaryCta: "Book a Session",
    secondaryCta: "See the work",
  },

  gallery: {
    eyebrow: "01 · Selected Work",
    title: "Marks made with intention.",
    items: [
      {
        id: "n1",
        image: "novaAccentA",
        alt: "Minimal geometric tattoo on forearm",
        title: "Vector",
        category: "Machine",
        meta: "Forearm · 1h",
        ratio: "aspect-[5/8]",
      },
      {
        id: "n2",
        image: "novaAccentB",
        alt: "Fine-line snake tattoo on ankle",
        title: "Serpent",
        category: "Handpoke",
        meta: "Ankle · 2.5h",
        ratio: "aspect-[4/5]",
      },
      {
        id: "n3",
        image: "gallery5",
        alt: "Flash sheet with small tattoo designs",
        title: "Flash Set A",
        category: "Flash",
        meta: "Walk-in friendly",
        ratio: "aspect-[4/3]",
      },
      {
        id: "n4",
        image: "gallery6",
        alt: "Ear piercing with gold jewelry",
        title: "Constellation",
        category: "Piercings",
        meta: "14k gold",
        ratio: "aspect-[4/5]",
      },
      {
        id: "n5",
        image: "ig1",
        alt: "Fine-line wrist tattoo detail",
        title: "Orbit",
        category: "Handpoke",
        meta: "Wrist · 45m",
        ratio: "aspect-square",
      },
      {
        id: "n6",
        image: "ig2",
        alt: "Minimal linework tattoo on shoulder",
        title: "Axis",
        category: "Machine",
        meta: "Shoulder · 1.5h",
        ratio: "aspect-[4/5]",
      },
    ],
  },

  process: {
    eyebrow: "02 · The Ritual",
    title: "How a piece comes to life.",
    titleItalic: "life",
    steps: [
      {
        no: "01. Connect",
        title: "Consultation",
        body: "We talk through your idea, placement, and timeline. Reference images welcome — the goal is a design that feels unmistakably yours.",
      },
      {
        no: "02. Draw",
        title: "Design",
        body: "Sketches are refined until the flow sits right on the body. Revisions are part of the process, not an afterthought.",
      },
      {
        no: "03. Tattoo",
        title: "Session",
        body: "A calm, private setup with spotless hygiene. Pacing is unhurried; breaks are encouraged.",
      },
      {
        no: "04. Heal",
        title: "Aftercare",
        body: "You leave with clear healing instructions and a check-in invite if anything looks off during recovery.",
      },
    ],
  },

  about: {
    eyebrow: "03 · The Artist",
    images: { portrait: "novaAbout" as AssetKey },
    portraitAlt: "full portrait",
    bio: [
      "I'm Luna — a fine-line and blackwork artist working out of a small studio in Bandra. My work leans graphic and minimal: clean lines, open skin, nothing fussy.",
      "Sessions are one-on-one by design. No walk-in rush, no loud shop floor — just the work, the music low, and time to get it right.",
    ],
    stats: [
      { value: "4", suffix: "+", label: "Years Tattooing" },
      { value: "800", suffix: "+", label: "Clients Inked" },
      { value: "100", suffix: "%", label: "Sterile Kit" },
    ],
  },

  testimonials: {
    eyebrow: "Kind Words",
    items: [
      {
        quote:
          "Super calm energy and insanely clean lines. Exactly what I wanted without having to over-explain.",
        name: "Rhea M.",
        place: "Mumbai",
      },
      {
        quote: "Booked for a flash piece and left with something that feels custom. Healing was smooth.",
        name: "Arjun P.",
        place: "Pune",
      },
      {
        quote: "Luna's studio is quiet, precise, and professional. Would recommend to anyone nervous about their first tattoo.",
        name: "Sana K.",
        place: "Bandra",
      },
    ],
  },

  faq: {
    eyebrow: "04 · FAQ",
    title: "Questions before you book.",
    titleItalic: "book",
    items: [
      {
        q: "How do I book?",
        a: "DM on Instagram or WhatsApp with your idea, size, and placement. A deposit holds your date once we agree on the design.",
      },
      {
        q: "Do you do cover-ups?",
        a: "Sometimes — send a photo of the existing tattoo and I'll be honest about what's possible.",
      },
      {
        q: "What should I expect on the day?",
        a: "Arrive fed and hydrated. We'll do a final stencil check, then settle in. Sessions vary from 45 minutes to multi-hour sits.",
      },
      {
        q: "Where is the studio?",
        a: "Bandra West, Mumbai — exact address shared after booking confirmation.",
      },
    ],
  },

  instagram: {
    eyebrow: "Studio Feed",
    title: "On Instagram.",
    grid: ["novaAccentA", "novaAccentB", "gallery5", "gallery6", "ig1", "ig2", "ig3", "ig4"] as AssetKey[],
  },

  booking: {
    eyebrow: "05 · Book",
    title: "Start something new.",
    titleItalic: "new",
    description:
      "Taking custom and flash bookings in Mumbai. Message me with your idea — I usually reply within 24 hours.",
    contacts: [
      { type: "whatsapp" as const, eyebrow: "WhatsApp", label: "Direct message" },
      { type: "instagram" as const, eyebrow: "Instagram", label: "" },
      { type: "email" as const, eyebrow: "Email", label: "" },
    ],
  },

  footer: {
    blurb: "A fine-line and blackwork tattoo studio.",
    appointmentNote: "By appointment only",
    craftedNote: "By appointment",
  },

  images: {
    og: "novaAccentA" as AssetKey,
  },
} satisfies ArtistContent;
