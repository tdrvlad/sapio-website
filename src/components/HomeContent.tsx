"use client";

import './comp.css';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import HeroVideo from '@/components/HeroVideo';
import { CLI } from '@/components/mac_cli';
import { useLanguage } from '@/contexts/LanguageContext';
import { Capabilities } from './sections/Capabilities';
import AIProductsSection from "@/components/sections/AIProductsSection";

type HomeContentProps = {
  clientLogos: string[];
  techLogos: string[];
};

const STATS = [
  { value: "50+",  label: "Projects delivered" },
  { value: "5+",   label: "Industries served" },
  { value: "500k+", label: "Documents indexed" },
  { value: "2021",  label: "In production since" },
];

export default function HomeContent({ clientLogos }: HomeContentProps) {
  const { t } = useLanguage();

  const toAlt = (src: string) => {
    const base = src.split("/").pop() || "logo";
    const name = base.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
    return `${name} logo`;
  };

  return (
    <div className="font-sans">
      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <HeroVideo />

      {/* ── 2. SOCIAL PROOF STRIP ───────────────────────────── */}
      {clientLogos.length > 0 && (
        <section className="border-y border-border bg-background py-6">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <p className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">
              {t("home.clients.heading")}
            </p>
            <div className="relative overflow-hidden marquee-container">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent z-10" />
              <div className="marquee-track">
                <div className="flex items-center gap-10 sm:gap-14">
                  {[...clientLogos, ...clientLogos].map((src, i) => (
                    <div key={i} className="flex-shrink-0">
                      <Image
                        src={src}
                        alt={`Client: ${toAlt(src)}`}
                        width={120}
                        height={40}
                        className="h-7 sm:h-9 w-auto grayscale opacity-40 hover:opacity-80 hover:grayscale-0 transition duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. CLI / ASSISTANT ──────────────────────────────── */}
      <section className="relative py-16 sm:py-24 bg-background overflow-hidden">
        {/* Dot grid overlay */}
        <div className="pointer-events-none absolute inset-0 dot-grid" aria-hidden />
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent z-10" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-10" aria-hidden />

        <div className="relative z-20 mx-auto w-full max-w-[1100px] px-4 sm:px-6">
          <div className="text-center space-y-3 mb-10 sm:mb-14">
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-violet-400 border border-violet-500/30 rounded-full px-4 py-1.5">
              Sapio Assistant
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t("home.sapioConsole.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              {t("home.sapioConsole.subtitle")}
            </p>
          </div>
          {/* Terminal with ambient violet glow */}
          <div className="violet-glow rounded-xl">
            <CLI />
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PROJECT ─────────────────────────────── */}
      <section className="bg-[#f4f4f5] dark:bg-[#111111] py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8 sm:mb-12">
              {t("home.flagshipTitle")}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* Screenshot */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-black/5 dark:bg-white/5"
              >
                <Image
                  src="/brand/ai-aflat_thumbnail.png"
                  alt="ai-aflat thumbnail"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="text-3xl sm:text-4xl font-black mb-4">ai&#8209;aflat.ro</h3>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
                  Romania&apos;s most advanced legal AI platform. Free semantic search
                  across 500,000+ legislative documents — our commitment to{" "}
                  <span className="font-semibold text-foreground">Tech for Good</span>.
                </p>

                {/* Stats row */}
                <div className="flex gap-8 sm:gap-12 mb-8 pb-8 border-b border-border">
                  {[
                    { value: "500k+", label: "Documents" },
                    { value: "Free",  label: "Public access" },
                    { value: "#1",    label: "Legal AI in RO" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-3xl sm:text-4xl font-black tabular-nums">{s.value}</div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://ai-aflat.ro"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:opacity-75 transition"
                  >
                    Visit website
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <Link
                    href="/projects/ai-aflat"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-foreground/5 transition"
                  >
                    Case study →
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. CAPABILITIES ─────────────────────────────────── */}
      <Capabilities />

      {/* ── 6. IMPACT STATS STRIP ───────────────────────────── */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="py-10 px-4 sm:px-8 text-center"
              >
                <div className="text-3xl sm:text-4xl font-black tabular-nums">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PROCESS ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-14 text-center"
        >
          {t("home.process.title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {(t("home.process.steps") as unknown as { title: string; description: string }[]).map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
              className="relative rounded-2xl bg-card border border-border p-8 overflow-hidden group hover:border-violet-500/30 transition-colors duration-300"
            >
              {/* Ghosted step number */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-3 right-4 text-[7rem] font-black leading-none select-none"
                style={{ color: "var(--foreground)", opacity: 0.035 }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <span className="text-xs font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 8. AI PRODUCTS ──────────────────────────────────── */}
      <AIProductsSection />

      {/* ── 9. CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 sm:py-36 bg-background">
        {/* Violet gradient wash */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-950/25 via-transparent to-transparent" aria-hidden />
        {/* Ambient glow orb */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)" }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black leading-tight mb-5"
          >
            {t("home.cta.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-base sm:text-lg mb-10 leading-relaxed"
          >
            {t("home.cta.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-block rounded-full bg-primary text-white px-8 py-4 text-sm font-semibold hover:bg-primary/90 transition duration-200 shadow-lg shadow-primary/25"
            >
              {t("home.cta.button")}
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-6 text-xs sm:text-sm text-muted-foreground"
          >
            {t("home.cta.contact")}
          </motion.p>
        </div>
      </section>
    </div>
  );
}
