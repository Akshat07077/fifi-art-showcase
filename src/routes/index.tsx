import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "@/components/landing/Reveal";
import { SmoothScroll } from "@/components/landing/SmoothScroll";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import {
  INSTAGRAM_LABEL,
  INSTAGRAM_URL,
  SITE_URL,
  STUDIO_CITY,
  STUDIO_COUNTRY,
  STUDIO_EMAIL,
  STUDIO_EMAIL_URL,
  STUDIO_POSTAL_CODE,
  STUDIO_STREET,
  WHATSAPP_URL,
} from "@/lib/site-config";

import heroNeedle from "@/assets/hero-needle.jpg";
import artistPortrait from "@/assets/artist-portrait.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import ig1 from "@/assets/ig-1.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";

const SITE_TITLE = "Fifi Poke — Handpoke & Machine Tattoo Studio, Delhi";
const SITE_DESC =
  "Delhi boutique tattoo studio by Fifi. Custom handpoke tattoos, fine-line machine work, flash designs and piercings — by appointment in Hauz Khas.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: heroNeedle },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
      { name: "twitter:image", content: heroNeedle },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TattooParlor",
          name: "Fifi Poke",
          description: SITE_DESC,
          image: heroNeedle,
          address: {
            "@type": "PostalAddress",
            streetAddress: STUDIO_STREET,
            addressLocality: STUDIO_CITY,
            postalCode: STUDIO_POSTAL_CODE,
            addressCountry: STUDIO_COUNTRY,
          },
          sameAs: [INSTAGRAM_URL],
          priceRange: "₹₹",
        }),
      },
    ],
  }),
  component: LandingPage,
});

type Category = "All" | "Handpoke" | "Machine" | "Flash" | "Piercings";
const CATEGORIES: Category[] = ["All", "Handpoke", "Machine", "Flash", "Piercings"];

type Work = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: Exclude<Category, "All">;
  meta: string;
  ratio: string;
};

const WORKS: Work[] = [
  { id: "w1", src: gallery1, alt: "Fine-line floral handpoke tattoo on inner wrist", title: "Wildflower", category: "Handpoke", meta: "Inner wrist · 2h", ratio: "aspect-[5/7]" },
  { id: "w2", src: gallery2, alt: "Small fine-line butterfly tattoo on forearm", title: "Monarch", category: "Handpoke", meta: "Forearm · 1.5h", ratio: "aspect-square" },
  { id: "w3", src: gallery3, alt: "Minimal geometric line tattoo on forearm", title: "Acute", category: "Machine", meta: "Forearm · 1h", ratio: "aspect-[5/8]" },
  { id: "w4", src: gallery4, alt: "Fine-line snake tattoo wrapping the ankle", title: "Ouroboros", category: "Handpoke", meta: "Ankle · 3h", ratio: "aspect-[4/5]" },
  { id: "w5", src: gallery5, alt: "Hand-drawn flash tattoo sheet on cream paper", title: "Flash Sheet 03", category: "Flash", meta: "Available designs", ratio: "aspect-[4/3]" },
  { id: "w6", src: gallery6, alt: "Elegant ear piercing with gold hoop and stud", title: "Lobe + Helix", category: "Piercings", meta: "14k gold", ratio: "aspect-[4/5]" },
];

/** Grid preview images — replace files in src/assets/ with posts from @fifipoke. */
const INSTAGRAM = [ig1, ig2, ig3, ig4, gallery2, gallery1, gallery3, gallery6];

const PROCESS_STEPS = [
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
    body: "A quiet, meditative environment in the Delhi studio. Handpoke is slower and ritualistic; machine work offers precision and depth. Both held to clinical hygiene standards.",
  },
  {
    no: "04. Preservation",
    title: "Aftercare",
    body: "Healing is as critical as the application. You leave with a curated aftercare kit and clear instructions so your tattoo heals with crisp clarity and longevity.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Fifi's studio feels more like a gallery than a tattoo shop. The handpoke process was meditative — I left with a piece I am proud to wear forever.",
    name: "Ananya S.",
    place: "Delhi",
  },
  {
    quote: "She took the time to understand the story behind the design. The line work is impossibly fine and has healed beautifully.",
    name: "Ishaan R.",
    place: "Mumbai",
  },
  {
    quote: "Calm hands, careful eye, immaculate hygiene. The most considered tattoo experience I've had anywhere.",
    name: "Mira K.",
    place: "Bengaluru",
  },
];

const FAQS = [
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
];

const SECTION_SCROLL = "scroll-mt-28";

function LandingPage() {
  const [filter, setFilter] = useState<Category>("All");
  const [active, setActive] = useState<Work | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const { menuRef, closeButtonRef } = useMobileMenu(menuOpen, closeMenu);

  const navLinks = [
    { href: "#works", label: "Gallery" },
    { href: "#ritual", label: "Process" },
    { href: "#artist", label: "Artist" },
    { href: "#faq", label: "FAQ" },
    { href: "#booking", label: "Book" },
  ];

  const visible = useMemo(
    () => (filter === "All" ? WORKS : WORKS.filter((w) => w.category === filter)),
    [filter],
  );

  return (
    <main className="bg-canvas text-ink font-sans selection:bg-ink/10 antialiased">
      <SmoothScroll />

      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-40 px-6 lg:px-12 py-5 flex items-center justify-between bg-canvas/85 backdrop-blur-md text-ink border-b border-ink/5">
        <a href="#top" className="font-serif text-xl tracking-tight font-medium italic">
          Fifi Poke
        </a>
        <nav className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.25em] font-medium">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:opacity-60 transition-opacity">
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-ink text-canvas md:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-serif text-xl italic font-medium">Fifi Poke</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="inline-flex items-center justify-center w-10 h-10 -mr-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-6 gap-6">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl italic font-medium tracking-tight hover:opacity-60 transition-opacity"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-6 py-8 text-[10px] uppercase tracking-[0.3em] text-canvas/50">
              Delhi · By Appointment
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky vertical section index */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-30">
        <div className="flex flex-col gap-5 text-[10px] tracking-[0.25em] font-medium text-ink/40 uppercase [writing-mode:vertical-rl] rotate-180">
          <a href="#works" className="hover:text-ink transition-colors">01 · Gallery</a>
          <a href="#ritual" className="hover:text-ink transition-colors">02 · Process</a>
          <a href="#artist" className="hover:text-ink transition-colors">03 · Artist</a>
          <a href="#booking" className="hover:text-ink transition-colors">04 · Booking</a>
        </div>
        <div className="w-px h-16 bg-ink/10 mx-auto" />
      </nav>

      {/* Hero */}
      <section id="top" className="relative min-h-screen flex flex-col justify-center px-6 lg:px-24 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-8"
            >
              Delhi · Handpoke &amp; Machine
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-serif text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95] text-balance font-medium tracking-[-0.01em] mb-12"
            >
              The silent dialogue
              <br />
              of <span className="italic font-normal">needle and skin</span>.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="#booking"
                className="inline-flex items-center gap-3 bg-ink text-canvas px-6 py-3 rounded-full text-sm font-medium hover:bg-ink/85 transition-all active:scale-[0.98]"
              >
                Book Your Session
                <span aria-hidden className="text-xs">→</span>
              </a>
              <a
                href="#works"
                className="group inline-flex items-center text-sm font-medium text-ink/60 hover:text-ink transition-colors"
              >
                <span className="mr-2 text-xs transition-transform group-hover:translate-y-0.5">↓</span>
                View the archive
              </a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 hidden lg:block"
          >
            <figure className="w-full aspect-[4/5] overflow-hidden rounded-[2px] ring-1 ring-ink/5">
              <img
                src={heroNeedle}
                alt="A handpoke needle resting above a ceramic well of black ink"
                width={768}
                height={1152}
                className="w-full h-full object-cover"
              />
            </figure>
            <figcaption className="mt-3 text-[10px] uppercase tracking-[0.25em] text-ink/40">
              Studio detail · 2024
            </figcaption>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="works" className={`py-28 lg:py-40 bg-paper ${SECTION_SCROLL}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-20">
            <div className="max-w-[48ch]">
              <span className="block text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-4">
                01 · Selected Impressions
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-tight font-medium tracking-[-0.01em]">
                A quiet archive of permanent marks.
              </h2>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
              {CATEGORIES.map((c) => {
                const isActive = filter === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFilter(c)}
                    aria-pressed={isActive}
                    className={
                      "whitespace-nowrap px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all " +
                      (isActive
                        ? "bg-ink text-canvas"
                        : "bg-canvas ring-1 ring-ink/10 text-ink/60 hover:ring-ink/25 hover:text-ink")
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8 [column-fill:_balance]">
            {visible.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setActive(w)}
                className="group relative mb-6 lg:mb-8 block w-full text-left break-inside-avoid bg-transparent border-0 p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded-[2px]"
                aria-label={`Open ${w.title}`}
              >
                <figure className={"w-full overflow-hidden rounded-[2px] ring-1 ring-ink/5 bg-canvas " + w.ratio}>
                  <img
                    src={w.src}
                    alt={w.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </figure>
                <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="font-serif italic text-lg leading-none">{w.title}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40">
                    {w.category} · {w.meta}
                  </span>
                </figcaption>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="ritual" className={`py-28 lg:py-40 ${SECTION_SCROLL}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="block text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-4">
                  02 · The Method
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl leading-[1.05] font-medium tracking-[-0.01em] lg:sticky lg:top-32">
                  Four stages of <span className="italic font-normal">synthesis</span>.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <ol className="space-y-16 lg:space-y-20 divide-y divide-ink/10">
                {PROCESS_STEPS.map((s, i) => (
                  <li key={s.no} className={i === 0 ? "" : "pt-16 lg:pt-20"}>
                    <Reveal>
                      <span className="block font-serif text-3xl lg:text-4xl text-ink/25 mb-6 font-medium italic">
                        {s.no}
                      </span>
                      <h3 className="text-lg font-medium mb-4 tracking-[-0.01em]">{s.title}</h3>
                      <p className="text-ink/60 text-pretty max-w-[58ch] leading-relaxed">{s.body}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Artist */}
      <section id="artist" className={`py-28 lg:py-40 bg-paper ${SECTION_SCROLL}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <Reveal className="lg:col-span-6 order-2 lg:order-1">
              <span className="block text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-6">
                03 · The Practitioner
              </span>
              <h2 className="font-serif text-5xl lg:text-6xl leading-[1] font-medium tracking-[-0.02em] mb-10 italic">
                Fifi.
              </h2>
              <div className="space-y-5 text-ink/65 leading-relaxed max-w-[50ch] mb-12">
                <p>
                  Based in the heart of Delhi, my practice is rooted in the belief that a tattoo is more than pigment — it is a transformation of the self. I specialise in the slow, intentional art of handpoke, with a careful machine practice for pieces that ask for it.
                </p>
                <p>
                  My studio is a sanctuary designed for focus and calm, away from the bustle of commercial shops. Here, craftsmanship meets mindfulness — every session is a single conversation, never a queue.
                </p>
              </div>
              <div className="flex gap-12 border-t border-ink/10 pt-10">
                <div>
                  <span className="block text-3xl font-serif font-medium">6<span className="text-ink/40">+</span></span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40 mt-2 block">Years of Practice</span>
                </div>
                <div>
                  <span className="block text-3xl font-serif font-medium">1.2k<span className="text-ink/40">+</span></span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40 mt-2 block">Marks Made</span>
                </div>
                <div>
                  <span className="block text-3xl font-serif font-medium italic">∞</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40 mt-2 block">Cups of Chai</span>
                </div>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-6 order-1 lg:order-2" delay={0.1}>
              <figure className="w-full aspect-[3/4] overflow-hidden rounded-[2px] ring-1 ring-ink/5 bg-canvas">
                <img
                  src={artistPortrait}
                  alt="Portrait of Fifi, tattoo artist, in her Delhi studio"
                  width={1024}
                  height={1344}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 lg:py-40">
        <div className="max-w-5xl mx-auto px-6 lg:px-24">
          <Reveal>
            <span className="block text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-12 text-center">
              Client Echoes
            </span>
          </Reveal>
          <div className="grid gap-20 lg:gap-28">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <figure className={i % 2 === 0 ? "max-w-[60ch]" : "max-w-[60ch] ml-auto text-right"}>
                  <blockquote className="font-serif text-2xl lg:text-3xl leading-[1.35] italic text-balance">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-[10px] uppercase tracking-[0.3em] text-ink/45">
                    — {t.name} · {t.place}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-28 lg:py-40 bg-paper ${SECTION_SCROLL}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <span className="block text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-4">
              04 · Notes
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.05] font-medium tracking-[-0.01em]">
              Things people <span className="italic">often</span> ask.
            </h2>
          </Reveal>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full divide-y divide-ink/10 border-y border-ink/10">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`} className="border-b-0">
                  <AccordionTrigger className="py-6 text-left text-base lg:text-lg font-medium hover:no-underline tracking-[-0.01em]">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-ink/65 leading-relaxed text-[15px] max-w-[64ch]">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-28 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-4">
                From the Studio
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl leading-tight font-medium tracking-[-0.01em]">
                Latest on Instagram.
              </h2>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-sm font-medium text-ink/70 hover:text-ink transition-colors"
            >
              <span>{INSTAGRAM_LABEL}</span>
              <span aria-hidden className="text-xs transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
              {INSTAGRAM.map((src, i) => (
                <a
                  key={i}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group block aspect-square overflow-hidden rounded-[2px] ring-1 ring-ink/5"
                >
                  <img
                    src={src}
                    alt={`Studio post ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className={`py-32 lg:py-48 bg-ink text-canvas ${SECTION_SCROLL}`}>
        <div className="max-w-5xl mx-auto px-6 lg:px-24 text-center">
          <Reveal>
            <span className="block text-[11px] uppercase tracking-[0.3em] text-canvas/50 mb-8">
              05 · Booking
            </span>
            <h2 className="font-serif text-4xl lg:text-7xl leading-[1.02] font-medium tracking-[-0.02em] mb-10 text-balance">
              Commence a new <span className="italic font-normal">narrative</span>.
            </h2>
            <p className="text-canvas/60 max-w-[44ch] mx-auto text-pretty leading-relaxed mb-14">
              Currently accepting inquiries for custom projects, flash, and small piercings in Delhi. Choose your preferred channel — I usually reply within a day.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-3xl mx-auto">
              <ContactCard
                href={WHATSAPP_URL}
                eyebrow="WhatsApp"
                label="Direct message"
              />
              <ContactCard
                href={INSTAGRAM_URL}
                eyebrow="Instagram"
                label={INSTAGRAM_LABEL}
              />
              <ContactCard
                href={STUDIO_EMAIL_URL}
                eyebrow="Email"
                label={STUDIO_EMAIL}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 py-14 bg-canvas">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 grid gap-10 md:grid-cols-3 items-start">
          <div className="space-y-3">
            <span className="font-serif text-2xl italic font-medium tracking-tight">Fifi Poke</span>
            <p className="text-xs text-ink/50 leading-relaxed max-w-[28ch]">
              A boutique handpoke and machine tattoo studio in Hauz Khas Village, New Delhi.
            </p>
          </div>
          <div className="space-y-3 text-xs text-ink/60 leading-relaxed">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40">Studio</p>
            <p>{STUDIO_STREET}<br/>{STUDIO_CITY}, {STUDIO_POSTAL_CODE}</p>
            <p>Tue — Sat · 11:00 – 19:00<br/>By appointment only</p>
          </div>
          <div className="space-y-3 text-xs text-ink/60">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40">Elsewhere</p>
            <ul className="space-y-2">
              <li><a className="hover:text-ink transition-colors" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a className="hover:text-ink transition-colors" href={WHATSAPP_URL}>WhatsApp</a></li>
              <li><a className="hover:text-ink transition-colors" href={STUDIO_EMAIL_URL}>Email the studio</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-24 mt-12 pt-6 border-t border-ink/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-ink/40">
          <p>© {new Date().getFullYear()} Fifi Poke Studio</p>
          <p>Crafted in Delhi · By appointment</p>
        </div>
      </footer>

      {/* Lightbox */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl bg-canvas border-ink/10 p-0 overflow-hidden">
          {active && (
            <div className="grid md:grid-cols-[1.4fr_1fr]">
              <div className="bg-paper flex items-center justify-center p-4">
                <img
                  src={active.src}
                  alt={active.alt}
                  className="max-h-[78vh] w-auto object-contain"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-between gap-8">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-4">
                    {active.category}
                  </span>
                  <DialogTitle className="font-serif text-3xl lg:text-4xl font-medium italic mb-4 tracking-[-0.01em]">
                    {active.title}
                  </DialogTitle>
                  <p className="text-sm text-ink/60 leading-relaxed">
                    {active.alt}. A one-of-a-kind composition; similar designs available on commission.
                  </p>
                </div>
                <div className="space-y-4 text-xs text-ink/60">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40">Details</p>
                  <p>{active.meta}</p>
                  <a
                    href="#booking"
                    onClick={() => setActive(null)}
                    className="inline-flex items-center gap-2 mt-4 bg-ink text-canvas px-4 py-2 rounded-full text-xs font-medium hover:bg-ink/85 transition-colors"
                  >
                    Enquire about a similar piece →
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function ContactCard({ href, eyebrow, label }: { href: string; eyebrow: string; label: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex flex-col items-center gap-2 p-8 rounded-[2px] ring-1 ring-canvas/15 hover:ring-canvas/45 hover:bg-canvas/5 transition-all"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-canvas/50 group-hover:text-canvas transition-colors">
        {eyebrow}
      </span>
      <span className="text-sm font-medium">{label}</span>
      <span aria-hidden className="text-xs text-canvas/40 mt-2 transition-transform group-hover:translate-x-1">→</span>
    </a>
  );
}
