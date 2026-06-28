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
import type { GalleryCategory } from "@/config/artist.content";
import { site } from "@/config/site";

const SECTION_SCROLL = "scroll-mt-28";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: site.seo.title },
      { name: "description", content: site.seo.description },
      { property: "og:title", content: site.seo.title },
      { property: "og:description", content: site.seo.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: site.env.SITE_URL },
      { property: "og:image", content: site.seo.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: site.seo.title },
      { name: "twitter:description", content: site.seo.description },
      { name: "twitter:image", content: site.seo.ogImage },
    ],
    links: [{ rel: "canonical", href: site.env.SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TattooParlor",
          name: site.brand.name,
          description: site.seo.description,
          image: site.seo.ogImage,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.env.STUDIO_STREET,
            addressLocality: site.env.STUDIO_CITY,
            postalCode: site.env.STUDIO_POSTAL_CODE,
            addressCountry: site.env.STUDIO_COUNTRY,
          },
          sameAs: [site.env.INSTAGRAM_URL],
          priceRange: site.env.PRICE_RANGE,
        }),
      },
    ],
  }),
  component: LandingPage,
});

type Work = (typeof site.works)[number];

function LandingPage() {
  const [filter, setFilter] = useState<GalleryCategory>("All");
  const [active, setActive] = useState<Work | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const { menuRef, closeButtonRef } = useMobileMenu(menuOpen, closeMenu);

  const visible = useMemo(
    () => (filter === "All" ? site.works : site.works.filter((w) => w.category === filter)),
    [filter],
  );

  return (
    <main className="bg-canvas text-ink font-sans selection:bg-ink/10 antialiased">
      <SmoothScroll />

      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-40 px-6 lg:px-12 py-5 flex items-center justify-between bg-canvas/85 backdrop-blur-md text-ink border-b border-ink/5">
        <a href="#top" className="font-serif text-xl tracking-tight font-medium italic">
          {site.brand.name}
        </a>
        <nav className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.25em] font-medium">
          {site.content.nav.map((l) => (
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
              <span className="font-serif text-xl italic font-medium">{site.brand.name}</span>
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
              {site.content.nav.map((l, i) => (
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
              {site.ui.mobileMenuTagline}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky vertical section index */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-30">
        <div className="flex flex-col gap-5 text-[10px] tracking-[0.25em] font-medium text-ink/40 uppercase [writing-mode:vertical-rl] rotate-180">
          {site.content.sideNav.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="w-px h-16 bg-ink/10 mx-auto" />
      </nav>

      {/* Hero */}
      <section id="top" className="relative min-h-[100svh] lg:min-h-screen overflow-hidden">
        <div className="lg:grid lg:grid-cols-12 lg:min-h-screen">
          {/* Visual panel — always visible (was hidden below lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[50vh] min-h-[280px] sm:h-[55vh] lg:col-span-5 lg:col-start-8 lg:h-auto lg:min-h-screen"
          >
            <img
              src={site.hero.portrait}
              alt={site.hero.portraitAlt}
              width={1024}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-canvas/40 via-transparent to-canvas sm:to-canvas/95 lg:bg-gradient-to-l lg:from-canvas/90 lg:via-canvas/25 lg:to-transparent" />

            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-5 left-5 w-[30%] max-w-[7.5rem] overflow-hidden rounded-[2px] ring-2 ring-canvas shadow-md sm:bottom-8 sm:left-8 sm:max-w-[8.5rem] lg:bottom-16 lg:-left-10 lg:w-36 lg:max-w-none"
            >
              <img
                src={site.hero.accents[0]}
                alt={site.hero.accentAlts[0]}
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.figure>

            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-5 right-5 w-[30%] max-w-[7.5rem] overflow-hidden rounded-[2px] ring-2 ring-canvas shadow-md sm:bottom-8 sm:right-8 sm:max-w-[8.5rem] lg:top-28 lg:right-auto lg:left-12 lg:w-32 lg:max-w-none"
            >
              <img
                src={site.hero.accents[1]}
                alt={site.hero.accentAlts[1]}
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.figure>
          </motion.div>

          {/* Copy */}
          <div className="relative z-10 flex flex-col justify-center px-6 lg:px-16 xl:px-24 pb-16 pt-8 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:min-h-screen lg:py-32 lg:pr-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-6 lg:mb-8"
            >
              {site.hero.eyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-serif text-[clamp(2.5rem,8vw,5.75rem)] leading-[0.95] text-balance font-medium tracking-[-0.01em] mb-8 lg:mb-12 max-w-[14ch] lg:max-w-none"
            >
              {site.content.hero.headlineBefore}
              <br />
              of <span className="italic font-normal">{site.content.hero.headlineItalic}</span>.
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
                {site.content.hero.primaryCta}
                <span aria-hidden className="text-xs">→</span>
              </a>
              <a
                href="#works"
                className="group inline-flex items-center text-sm font-medium text-ink/60 hover:text-ink transition-colors"
              >
                <span className="mr-2 text-xs transition-transform group-hover:translate-y-0.5">↓</span>
                {site.content.hero.secondaryCta}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 hidden sm:grid grid-cols-3 gap-2 max-w-md lg:max-w-sm"
            >
              {site.hero.strip.map((src, i) => (
                <a
                  key={i}
                  href="#works"
                  className="group relative aspect-[4/5] overflow-hidden rounded-[2px] ring-1 ring-ink/10"
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </a>
              ))}
            </motion.div>
            <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-ink/40 hidden lg:block">
              {site.hero.locationTag}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="works" className={`py-28 lg:py-40 bg-paper ${SECTION_SCROLL}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-20">
            <div className="max-w-[48ch]">
              <span className="block text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-4">
                {site.content.gallery.eyebrow}
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-tight font-medium tracking-[-0.01em]">
                {site.content.gallery.title}
              </h2>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
              {site.categories.map((c) => {
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
                {site.content.process.eyebrow}
              </span>
                <h2 className="font-serif text-4xl lg:text-5xl leading-[1.05] font-medium tracking-[-0.01em] lg:sticky lg:top-32">
                  Four stages of <span className="italic font-normal">{site.content.process.titleItalic}</span>.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <ol className="space-y-16 lg:space-y-20 divide-y divide-ink/10">
                {site.content.process.steps.map((s, i) => (
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
                {site.content.about.eyebrow}
              </span>
              <h2 className="font-serif text-5xl lg:text-6xl leading-[1] font-medium tracking-[-0.02em] mb-10 italic">
                {site.about.heading}
              </h2>
              <div className="space-y-5 text-ink/65 leading-relaxed max-w-[50ch] mb-12">
                {site.content.about.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              <div className="flex gap-12 border-t border-ink/10 pt-10">
                {site.content.about.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="block text-3xl font-serif font-medium">
                      {stat.value}
                      {stat.suffix && <span className="text-ink/40">{stat.suffix}</span>}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40 mt-2 block">{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="lg:col-span-6 order-1 lg:order-2" delay={0.1}>
              <figure className="w-full overflow-hidden rounded-[2px] ring-1 ring-ink/5 bg-canvas">
                <img
                  src={site.about.portrait}
                  alt={site.about.portraitAlt}
                  loading="lazy"
                  className="w-full h-auto object-contain"
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
              {site.content.testimonials.eyebrow}
            </span>
          </Reveal>
          <div className="grid gap-20 lg:gap-28">
            {site.content.testimonials.items.map((t, i) => (
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
              {site.content.faq.eyebrow}
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.05] font-medium tracking-[-0.01em]">
              Things people <span className="italic">{site.content.faq.titleItalic}</span> ask.
            </h2>
          </Reveal>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full divide-y divide-ink/10 border-y border-ink/10">
              {site.content.faq.items.map((f, i) => (
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
                {site.content.instagram.eyebrow}
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl leading-tight font-medium tracking-[-0.01em]">
                {site.content.instagram.title}
              </h2>
            </div>
            <a
              href={site.env.INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-sm font-medium text-ink/70 hover:text-ink transition-colors"
            >
              <span>{site.env.INSTAGRAM_LABEL}</span>
              <span aria-hidden className="text-xs transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
              {site.instagram.grid.map((src, i) => (
                <a
                  key={i}
                  href={site.env.INSTAGRAM_URL}
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
              {site.content.booking.eyebrow}
            </span>
            <h2 className="font-serif text-4xl lg:text-7xl leading-[1.02] font-medium tracking-[-0.02em] mb-10 text-balance">
              Commence a new <span className="italic font-normal">{site.content.booking.titleItalic}</span>.
            </h2>
            <p className="text-canvas/60 max-w-[44ch] mx-auto text-pretty leading-relaxed mb-14">
              {site.booking.description}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-3xl mx-auto">
              {site.booking.contacts.map((contact) => (
                <ContactCard
                  key={contact.type}
                  href={contact.href}
                  eyebrow={contact.eyebrow}
                  label={contact.label}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 py-14 bg-canvas">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 grid gap-10 md:grid-cols-3 items-start">
          <div className="space-y-3">
            <span className="font-serif text-2xl italic font-medium tracking-tight">{site.brand.name}</span>
            <p className="text-xs text-ink/50 leading-relaxed max-w-[28ch]">
              {site.footer.blurb}
            </p>
          </div>
          <div className="space-y-3 text-xs text-ink/60 leading-relaxed">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40">Studio</p>
            <p>{site.env.STUDIO_STREET}<br/>{site.env.STUDIO_CITY}, {site.env.STUDIO_POSTAL_CODE}</p>
            <p>{site.footer.hours}<br/>{site.content.footer.appointmentNote}</p>
          </div>
          <div className="space-y-3 text-xs text-ink/60">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40">Elsewhere</p>
            <ul className="space-y-2">
              <li><a className="hover:text-ink transition-colors" href={site.env.INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a className="hover:text-ink transition-colors" href={site.env.WHATSAPP_URL}>WhatsApp</a></li>
              <li><a className="hover:text-ink transition-colors" href={site.env.STUDIO_EMAIL_URL}>Email the studio</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-24 mt-12 pt-6 border-t border-ink/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-ink/40">
          <p>{site.footer.copyright}</p>
          <p>{site.footer.crafted}</p>
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
